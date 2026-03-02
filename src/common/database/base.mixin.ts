import { Index, UpdateDateColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseMixin {
  @PrimaryGeneratedColumn()
  @Index()
  public id: number;

  @UpdateDateColumn({ type: 'date' })
  public updatedAt: Date;

  @CreateDateColumn({ type: 'date' })
  public createdAt: Date;
}
