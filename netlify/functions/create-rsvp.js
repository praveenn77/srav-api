import { createResponse } from './utils/response.js';
import { getDb } from './db.js';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return createResponse(405, { error: 'Method not allowed' });
  }

  try {
    const body = JSON.parse(event.body);
    const { name, email, attending, guests, dietary_restrictions } = body;

    if (!name || !email || attending === undefined) {
      return createResponse(400, { error: 'Missing required fields' });
    }

    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO rsvps (name, email, attending, guests, dietary_restrictions)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(name, email, attending, guests || 0, dietary_restrictions || null);
    
    const newRsvp = db.prepare('SELECT * FROM rsvps WHERE id = ?').get(result.lastInsertRowid);
    return createResponse(201, newRsvp);
  } catch (error) {
    console.error('Error creating RSVP:', error);
    return createResponse(500, { error: 'Internal server error' });
  }
}