import { BaseMixin } from 'src/common/database/base.mixin';
import { Entity, Column, Index } from 'typeorm';

@Entity('users')
export class UserEntitie extends BaseMixin {
  @Column()
  @Index()
  public username!: string;

  @Column()
  public password!: string;
}
