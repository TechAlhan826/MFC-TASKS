import { Request, Response } from 'express';
import * as ticketService from '../services/ticket-service';
import prisma from '../configs/dbConfig';

export const generateTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId, tier } = req.body;
    const userId = req.user.id;

    const ticket = await ticketService.generateTicket(eventId, userId, tier);
    res.status(201).json({ success: true, data: ticket });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const scanTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ticketId } = req.body;
    const organizerId = req.user.id;

    const ticket = await ticketService.scanTicket(ticketId, organizerId);
    res.status(200).json({ success: true, data: ticket });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};