import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join('/tmp', 'rsvp.db'));

// Initialize database
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    attending BOOLEAN NOT NULL,
    guests INTEGER DEFAULT 0,
    dietary_restrictions TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

db.exec(createTableQuery);

export class RsvpModel {
  static create(rsvpData) {
    const { name, email, attending, guests, dietary_restrictions } = rsvpData;
    
    const stmt = db.prepare(`
      INSERT INTO rsvps (name, email, attending, guests, dietary_restrictions)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(name, email, attending, guests || 0, dietary_restrictions || null);
    return result.lastInsertRowid;
  }

  static getAll() {
    const stmt = db.prepare('SELECT * FROM rsvps ORDER BY created_at DESC');
    return stmt.all();
  }

  static getById(id) {
    const stmt = db.prepare('SELECT * FROM rsvps WHERE id = ?');
    return stmt.get(id);
  }
}