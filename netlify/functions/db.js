import Database from 'better-sqlite3';
import path from 'path';

let db;

export function getDb() {
  if (!db) {
    db = new Database(path.join('/tmp', 'rsvp.db'));
    
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
  }
  return db;
}