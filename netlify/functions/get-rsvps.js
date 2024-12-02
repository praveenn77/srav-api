import { createResponse } from './utils/response.js';
import { getDb } from './db.js';

export async function handler(event) {
  if (event.httpMethod !== 'GET') {
    return createResponse(405, { error: 'Method not allowed' });
  }

  try {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM rsvps ORDER BY created_at DESC');
    const rsvps = stmt.all();
    return createResponse(200, rsvps);
  } catch (error) {
    console.error('Error getting RSVPs:', error);
    return createResponse(500, { error: 'Internal server error' });
  }
}