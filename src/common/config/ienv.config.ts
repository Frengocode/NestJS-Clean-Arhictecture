export interface IEnvConfig {
  postgresql: IPostgresSQLConfig;
  redis: IRedisConfig;
  auth: IAuthConfig
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

export interface IRedisConfig extends HostPort {}


export interface IAuthConfig{
  jwtSecret: string,
  expiresAt: string
}