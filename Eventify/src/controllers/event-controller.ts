import { Request, Response } from 'express';
import * as eventService from '../services/event-service';
import prisma from '../configs/dbConfig';

export const createEvent = async (req: any, res: Response): Promise<void> => {
  try {
    if (typeof req.body.priceTiers !== 'object') {
      res.status(400).json({ success: false, error: 'Invalid price tiers' });
      return;
    }

    const event = await eventService.createEvent(req.body, req.user.id);
    res.status(201).json({ success: true, data: event });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getEvents = async (req: any, res: Response): Promise<void> => {
  try {
    const events = await eventService.getEventsForUser(req.user.id);
    res.status(200).json({ success: true, data: events });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};