export interface IEnvConfig {
  postgresql: IPostgresSQLConfig;
  redis: IRedisConfig;
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
