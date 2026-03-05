import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserDTO } from '../dto/responses/user.dto';
import { firstValueFrom } from 'rxjs';
import { userCreatedEvent, userUpdatedEvent } from '../constants/constants';

export const USER_EVENTS_CLIENT = Symbol('USER_EVENTS_CLIENT');

@Injectable()
export class UserEventsPublisher {
  constructor(
    @Inject(USER_EVENTS_CLIENT)
    public readonly client: ClientProxy,
  ) {}

  async publishUserCreated(dto: UserDTO): Promise<void> {
    await firstValueFrom(this.client.emit(userCreatedEvent, dto));
  }
  async publishUserUpdated(dto: UserDTO): Promise<void> {
    await firstValueFrom(this.client.emit(userUpdatedEvent, dto));
  }
}
