import { RsvpModel } from '../models/rsvp.js';

export class RsvpController {
  static async createRsvp(req, res) {
    try {
      const { name, email, attending, guests, dietary_restrictions } = req.body;

      // Basic validation
      if (!name || !email || attending === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const id = RsvpModel.create({
        name,
        email,
        attending,
        guests,
        dietary_restrictions
      });

      const rsvp = RsvpModel.getById(id);
      res.status(201).json(rsvp);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getAllRsvps(req, res) {
    try {
      const rsvps = RsvpModel.getAll();
      res.json(rsvps);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}