import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './common/database/database.module';
import { GlobalConfigModule } from './common/config/config.module';
import { RedisCacheModule } from './common/cache/redis/redis.cache.module';

@Module({
  imports: [GlobalConfigModule, UserModule, RedisCacheModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
