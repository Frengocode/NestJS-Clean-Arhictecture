import { Module } from '@nestjs/common';
import { UserHandlerController } from './user.handler.controller';
import { CacheGlobalModule } from 'src/common/cache/cache.module';
import { USER_CREATED_HANDLER } from './event-handlers/interfaces/iuser.created.handler';
import { USER_UPDATED_HANDLER } from './event-handlers/interfaces/iuser.updated.handler';
import { UserUpdatedHandler } from './event-handlers/infrastructure/user.updated.handlers';
import { UserCreatedHandler } from './event-handlers/infrastructure/user.created.handler';

@Module({
  imports: [CacheGlobalModule],
  providers: [
    { provide: USER_CREATED_HANDLER, useClass: UserCreatedHandler },
    { provide: USER_UPDATED_HANDLER, useClass: UserUpdatedHandler },
  ],
  controllers: [UserHandlerController],
})
export class UserHandlerModule {}
