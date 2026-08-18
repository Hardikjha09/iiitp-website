/**
 * src/index.ts — Application entry point
 *
 * IMPORTANT: env validation MUST be the very first import.
 * This ensures the process crashes immediately with a clear error
 * if any required environment variable is missing.
 */
import './config/env';  // ← must be first — validates all env vars at startup

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import gracefulShutdown from 'http-graceful-shutdown';

import { env } from './config/env';
import prisma from './config/prisma';
import { logger } from './utils/logger';

// TODO: import route modules in Phase 1
// import authRouter from './routes/auth';
// import noticesRouter from './routes/notices';
// ...

const app = express();

// ── Security middleware ──────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGINS.split(','),
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// ── Rate limiting ─────────────────────────────────────────────────────────────
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(generalLimiter);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', db: 'connected', ts: new Date().toISOString() });
  } catch {
    res.status(503).json({ status: 'error', db: 'disconnected' });
  }
});

// ── API routes (to be added in Phase 1) ──────────────────────────────────────
// app.use('/v1/auth', authRouter);
// app.use('/v1/notices', noticesRouter);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('Unhandled error', { err });
  res.status(500).json({ error: 'Internal server error' });
});

// ── Start server ──────────────────────────────────────────────────────────────
const server = app.listen(env.PORT, () => {
  logger.info(`🚀 API listening on port ${env.PORT} (${env.NODE_ENV})`);
  process.send?.('ready'); // signal PM2 that the process is ready [production]
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────
gracefulShutdown(server, {
  signals: 'SIGINT SIGTERM',
  timeout: 5000,
  onShutdown: async () => {
    await prisma.$disconnect();
    logger.info('DB disconnected. Exiting cleanly.');
  },
});

export default app;
