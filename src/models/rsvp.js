import db from '../database/init.js';

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