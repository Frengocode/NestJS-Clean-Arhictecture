import { Controller, Inject } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { UserDTO } from '../../dto/responses/user.dto';
import {
  type IUserCreatedHandler,
  USER_CREATED_HANDLER,
} from './event-handlers/interfaces/iuser.created.handler';
import {
  type IUserUpdateHandler,
  USER_UPDATED_HANDLER,
} from './event-handlers/interfaces/iuser.updated.handler';
import { userCreatedEvent, userUpdatedEvent } from '../../constants/constants';

@Controller()
export class UserHandlerController {
  constructor(
    @Inject(USER_CREATED_HANDLER)
    private readonly userCreatedHandler: IUserCreatedHandler,

    @Inject(USER_UPDATED_HANDLER)
    private readonly userUpdatedHandler: IUserUpdateHandler,
  ) {}

  @EventPattern(userCreatedEvent)
  async userCreatedEventHandle(@Ctx() context: RmqContext): Promise<void> {
    console.log(`[UserHandler] ${userCreatedEvent}`);
    try {
      await this.userCreatedHandler.handleEvent();
    } finally {
      this.ack(context);
    }
  }

  @EventPattern(userUpdatedEvent)
  async userUpdatedEventHandle(
    @Payload() payload: UserDTO,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    try {
      await this.userUpdatedHandler.handleEvent(payload);
      console.log(`[UserHandler] user.updated ${payload.id}`);
    } finally {
      this.ack(context);
    }
  }

  private ack(context: RmqContext): void {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }
}
