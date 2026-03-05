import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './common/database/database.module';
import { GlobalConfigModule } from './common/config/config.module';
import { CacheGlobalModule } from './common/cache/cache.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserHandlerModule } from './modules/user/events/handlers/user.handler.module';

@Module({
  imports: [
    UserHandlerModule,
    GlobalConfigModule,
    UserModule,
    CacheGlobalModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
