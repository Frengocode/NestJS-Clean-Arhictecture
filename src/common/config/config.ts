import {
  IAuthConfig,
  IEnvConfig,
  IPostgresSQLConfig,
  IRabbitMQConfig,
  IRedisConfig,
} from './ienv.config';

const parsePort = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 && parsed < 65536
    ? parsed
    : fallback;
};

export const Config = (): IEnvConfig => {
  const postgresql: IPostgresSQLConfig = {
    username: String(process.env.POSTGRESQL_USERNAME),
    password: String(process.env.POSTGRESQL_PASSWORD),
    host: String(process.env.POSTGRESQL_HOST),
    port: parsePort(process.env.POSTGRESQL_PORT, 5432),
    dbname: String(process.env.POSTGRESQL_DB_NAME),
  };

  const redis: IRedisConfig = {
    host: String(process.env.REDIS_HOST),
    port: parsePort(process.env.REDIS_PORT, 6379),
    defaultCacheTTL: Number(process.env.REDIS_DEFAULT_CACHE_TTL ?? 60000),
  };

  const auth: IAuthConfig = {
    jwtSecret: process.env.AUTH_JWT_SECRET ?? '',
    expiresAt: process.env.AUTH_EXPIRES_AT ?? '1d',
  };

  const rabbitMQ: IRabbitMQConfig = {
    url: process.env.RABBITMQ_URL ?? 'amqp://localhost:5672',
    queue: process.env.RABBITMQ_QUEUE ?? 'user.handler.queue',
    exchange: process.env.RABBITMQ_EXCHANGE ?? 'user.events',
  };

  const config: IEnvConfig = {
    postgresql: postgresql,
    redis: redis,
    auth: auth,
    rabbitMQ: rabbitMQ,
  };
  return config;
};
