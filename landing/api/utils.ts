/**
 * Common utilities for Landing API routes
 */

import { CONTENT_TYPE_JSON, CORS_ALLOW_HEADERS } from '@/lib/constants';

export function allowedCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': CORS_ALLOW_HEADERS,
  };
}

export function json(
  statusCode: number,
  body: any,
  extraHeaders: Record<string, string> = {}
) {
  return {
    statusCode,
    headers: {
      'Content-Type': CONTENT_TYPE_JSON,
      ...allowedCorsHeaders(),
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

export function extractIp(headers?: Record<string, string>) {
  const h = headers || {};
  return (
    h['x-forwarded-for'] ||
    h['X-Forwarded-For'] ||
    h['x-real-ip'] ||
    h['X-Real-IP'] ||
    ''
  );
}

export type LandingEvent = {
  requestContext?: { http?: { method?: string } };
  headers?: Record<string, string>;
  body?: string;
};
