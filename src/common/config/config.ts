import { IEnvConfig, IPostgresSQLConfig, IRedisConfig } from './ienv.config';

const parsePort = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 && parsed < 65536
    ? parsed
    : fallback;
};

export const Config = (): IEnvConfig => {
  const postgresql: IPostgresSQLConfig = {
    username: process.env.POSTGRESQL_USERNAME ?? 'postgres',
    password: process.env.POSTGRESQL_PASSWORD ?? 'postgres',
    host: process.env.POSTGRESQL_HOST ?? 'localhost',
    port: parsePort(process.env.POSTGRESQL_PORT, 5432),
    dbname: process.env.POSTGRESQL_DB_NAME ?? 'postdb',
  };

  const redis: IRedisConfig = {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parsePort(process.env.REDIS_PORT, 6379),
  };

  const config: IEnvConfig = {
    postgresql: postgresql,
    redis: redis,
  };
  return config;
};
