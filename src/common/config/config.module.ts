import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { Config } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        resolve(process.cwd(), '.env'),
        resolve(__dirname, '../../../.env'),
        '.env',
        '../.env',
        '../../.env',
      ],
      load: [Config],
    }),
  ],
})
export class GlobalConfigModule {}
