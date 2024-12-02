import Database from 'better-sqlite3';

const db = new Database('rsvp.db');

export function initializeDatabase() {
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

export default db;