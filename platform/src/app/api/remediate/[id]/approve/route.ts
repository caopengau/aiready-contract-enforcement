import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getRemediation, updateRemediation } from '@/lib/db/remediation';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const remediation = await getRemediation(id);
    if (!remediation) {
      return NextResponse.json(
        { error: 'Remediation not found' },
        { status: 404 }
      );
    }

    // 1. Update status to 'approved'
    await updateRemediation(id, {
      status: 'approved',
      agentStatus: 'Human approved. Starting refactor agent...',
    });

    // 2. Trigger the remediation cycle (reusing the logic from /api/remediate)
    // In a real implementation, this would trigger an SQS event.
    console.log(
      `[ApprovalAPI] Triggering refactor for ${id} after human approval`
    );

    return NextResponse.json({
      success: true,
      message: 'Remediation approved and started',
    });
  } catch (error) {
    console.error('[ApprovalAPI] Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
