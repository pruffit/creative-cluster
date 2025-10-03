/// <reference types="node" />

// Глобальные типы для Node.js
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production' | 'test';
      PORT?: string;
      HOST?: string;
      DATABASE_URL: string;
      REDIS_URL?: string;
      REDIS_TTL?: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN?: string;
      JWT_REFRESH_SECRET: string;
      JWT_REFRESH_EXPIRES_IN?: string;
      CORS_ORIGIN?: string;
      MAX_FILE_SIZE?: string;
      UPLOAD_DIR?: string;
    }
  }
}

export {};
