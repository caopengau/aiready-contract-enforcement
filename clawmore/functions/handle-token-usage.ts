import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  UpdateCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';
import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge';
import Stripe from 'stripe';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const eb = new EventBridgeClient({});
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27-acacia' as any,
});

const RECHARGE_THRESHOLD_CENTS = 500; // $5.00
const RECHARGE_AMOUNT_CENTS = 1000; // $10.00

export const handler = async (event: any) => {
  const { userId, tokensUsed, model } = event.detail;

  // 1. Calculate Cost (Simplistic mapping for demo)
  // GPT-4o style pricing: ~$10 per 1M tokens = 0.001 cents per token
  const costCents = tokensUsed * 0.001;

  try {
    // 2. Deduct from Balance
    const updateResult = await ddb.send(
      new UpdateCommand({
        TableName: process.env.DYNAMO_TABLE,
        Key: { PK: `USER#${userId}`, SK: 'METADATA' },
        UpdateExpression:
          'SET aiTokenBalanceCents = aiTokenBalanceCents - :cost',
        ExpressionAttributeValues: { ':cost': costCents },
        ReturnValues: 'ALL_NEW',
      })
    );

    const newBalance = updateResult.Attributes?.aiTokenBalanceCents;

    // 3. Check for Recharge
    if (newBalance < RECHARGE_THRESHOLD_CENTS) {
      console.log(
        `[TokenGuard] Balance low for ${userId} (${newBalance}c). Attempting auto-recharge...`
      );

      const user = updateResult.Attributes;
      if (user?.stripeCustomerId) {
        try {
          // Attempt immediate charge
          await stripe.paymentIntents.create({
            amount: RECHARGE_AMOUNT_CENTS,
            currency: 'usd',
            customer: user.stripeCustomerId,
            off_session: true,
            confirm: true,
            description: 'ClawMore AI Token Auto-Refill',
          });

          // Update balance after successful charge
          await ddb.send(
            new UpdateCommand({
              TableName: process.env.DYNAMO_TABLE,
              Key: { PK: `USER#${userId}`, SK: 'METADATA' },
              UpdateExpression:
                'SET aiTokenBalanceCents = aiTokenBalanceCents + :refill',
              ExpressionAttributeValues: { ':refill': RECHARGE_AMOUNT_CENTS },
            })
          );

          console.log(`[TokenGuard] Successful recharge for ${userId}.`);
        } catch (stripeError: any) {
          console.error(
            `[TokenGuard] Recharge FAILED for ${userId}:`,
            stripeError.message
          );

          // 4. Emit Kill-Switch Event if Recharge Fails
          await eb.send(
            new PutEventsCommand({
              Entries: [
                {
                  Source: 'clawmore.platform',
                  DetailType: 'BalanceDepleted',
                  Detail: JSON.stringify({
                    userId,
                    reason: 'recharge_failed',
                    currentBalance: newBalance,
                  }),
                  EventBusName: process.env.CLAW_MORE_BUS,
                },
              ],
            })
          );
        }
      }
    }
  } catch (error) {
    console.error('[TokenGuard] Error processing usage:', error);
  }
};
