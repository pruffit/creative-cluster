import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { loggerMiddleware } from './common/middleware/logger';
import { errorHandler, notFoundHandler } from './common/middleware/errorHandler';
import authRoutes from './modules/auth/auth.routes';
import usersRoutes from './modules/users/users.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(loggerMiddleware);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

app.get('/api', (_req, res) => {
  res.json({
    message: 'Creative Cluster API',
    version: '1.0.0',
    docs: '/api/docs',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.info(`🚀 Server running on http://${HOST}:${PORT}`);
  console.info(`📝 Health check: http://${HOST}:${PORT}/health`);
  console.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

process.on('SIGTERM', () => {
  console.info('👋 SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.info('✅ HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.info('👋 SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.info('✅ HTTP server closed');
    process.exit(0);
  });
});
