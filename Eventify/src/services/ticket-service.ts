import QRCode from 'qrcode';
import prisma from '../configs/dbConfig';

export const generateTicket = async (eventId: string, userId: string, tier: string = 'REGULAR') => {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) throw new Error('Event not found');

  const existingTicket = await prisma.ticket.findFirst({
    where: { eventId, userId }
  });
  if (existingTicket) throw new Error('Already registered for this event');

  const qrData = `EVENT:${eventId}|USER:${userId}|TS:${Date.now()}`;
  const qrCode = await QRCode.toDataURL(qrData);

  return await prisma.ticket.create({
    data: {
      eventId,
      userId,
      qrCode,
      tier
    }
  });
};

export const scanTicket = async (ticketId: string, organizerId: string) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: { event: true }
  });

  if (!ticket) throw new Error('Ticket not found');
  if (ticket.event.organizerId !== organizerId) throw new Error('Unauthorized');

  return await prisma.ticket.update({
    where: { id: ticketId },
    data: { scanned: true }
  });
};