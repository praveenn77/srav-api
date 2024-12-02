import express from 'express';
import { RsvpController } from '../controllers/rsvp.js';

export const rsvpRouter = express.Router();

rsvpRouter.post('/', RsvpController.createRsvp);
rsvpRouter.get('/', RsvpController.getAllRsvps);