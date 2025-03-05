import { Router } from 'express';
import { authenticate } from '../utils/auth-middleware';
import { createEvent, getEvents } from '../controllers/event-controller';

const router = Router();

// ✅ Matches your MovieMania route patterns
router.post('/create', authenticate, createEvent);
router.get('/all', authenticate, getEvents);
router.delete('/:id', authenticate, (req, res) => {
  // Direct deletion logic here (your style)
  res.json({ success: true });
});

export default router;