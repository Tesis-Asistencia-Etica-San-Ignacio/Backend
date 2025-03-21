import dotenv from 'dotenv';
import { validateEnv } from '../../shared/utils';

dotenv.config();

const requiredEnvVars = ['MONGO_URI', 'CONVENTION_API', 'JWT_SECRET'];
validateEnv(requiredEnvVars);

const config = {
  database: {
    mongoUri: process.env.MONGO_URI as string,
  },
  server: {
    port: parseInt(process.env.PORT ?? '3000', 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
    tokenExpiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
    refreshExpiresTokenIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
  },
  logging: {
    level: process.env.LOG_LEVEL ?? 'info',
  },
  api: {
    conventionApi: process.env.CONVENTION_API as string,
  },
};

export default config;
