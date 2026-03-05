export interface IEnvConfig {
  postgresql: IPostgresSQLConfig;
  redis: IRedisConfig;
  auth: IAuthConfig;
  rabbitMQ: IRabbitMQConfig;
}

export interface HostPort {
  host: string;
  port: number;
}

export interface IPostgresSQLConfig extends HostPort {
  username: string;
  password: string;
  dbname: string;
}

export interface IRedisConfig extends HostPort {
  defaultCacheTTL: number;
}

export interface IAuthConfig {
  jwtSecret: string;
  expiresAt: string;
}

export interface IRabbitMQConfig {
  url: string;
  queue: string;
  exchange: string;
}
