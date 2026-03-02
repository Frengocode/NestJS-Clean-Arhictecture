import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Config } from '../config/config';
import { IEnvConfig } from '../config/ienv.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        const envConfig: IEnvConfig = Config();

        return {
          type: 'postgres',
          host: envConfig.postgresql.host,
          port: envConfig.postgresql.port,
          username: envConfig.postgresql.username,
          password: envConfig.postgresql.password,
          database: envConfig.postgresql.dbname,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
