import Historic from '../../../histories/typeorm/entities/Historic';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  description: string;

  @Column({
    default: false,
  })
  completed: boolean;

  @Expose({ name: 'createdAt' })
  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: 'updatedAt' })
  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'historiesTask' })
  @OneToMany(() => Historic, histories_task => histories_task.task)
  histories_task: Historic[];
}

export default Task;
