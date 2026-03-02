import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { Config } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env', '../../.env'],
      validate: Config,
    }),
  ],
})
export class GlobalConfigModule {}
