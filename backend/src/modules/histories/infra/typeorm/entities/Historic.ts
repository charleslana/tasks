import Task from '../../../../tasks/infra/typeorm/entities/Task';
import { Expose } from 'class-transformer';
import { IHistoric } from '../../../domain/models/IHistoric';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('histories')
class Historic implements IHistoric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  description: string;

  @Expose({ name: 'createdAt' })
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Task, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'task_id' })
  task: Task;
}

export default Historic;
