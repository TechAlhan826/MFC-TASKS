import prisma from '../configs/dbConfig';

export const createEvent = async (eventData: any, organizerId: string) => {
  return await prisma.event.create({
    data: {
      ...eventData,
      organizerId,
      type: eventData.type || 'PUBLIC'
    }
  });
};

export const getEventsForUser = async (userId: string) => {
  return await prisma.event.findMany({
    where: {
      OR: [{ type: 'PUBLIC' }, { organizerId: userId }]
    }
  });
};