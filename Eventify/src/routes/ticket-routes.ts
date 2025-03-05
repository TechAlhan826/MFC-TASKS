import { Router } from 'express';
import { generateTicket, scanTicket } from '../controllers/ticket-controller';

const router = Router();

router.post('/generate', generateTicket); // Generate ticket for an event
router.post('/scan', scanTicket); // Scan ticket (organizer-only)

export default router;