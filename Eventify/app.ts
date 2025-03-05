// File: src/app.ts
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { swaggerSpec } from './src/utils/swagger';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './src/routes/auth-routes';
import eventRoutes from './src/routes/event-routes';
import ticketRoutes from './src/routes/ticket-routes'
import { authenticate } from './src/utils/auth-middleware';


const app = express();

// Core middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', authenticate, eventRoutes);
app.use('/api/tickets', authenticate, ticketRoutes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/ping', (req, res) => {
  res.status(200).json({ success: true, data: 'pong' });
});

export default app;