import { ICreateTask } from '../models/ICreateTask';
import { ITask } from '../models/ITask';

export interface ITasksRepository {
  clearTasks(): Promise<void>;
  count(): Promise<number>;
  create(data: ICreateTask): Promise<ITask>;
  findAll(): Promise<ITask[]>;
  findByDescription(description: string): Promise<ITask | undefined>;
  findById(id: number): Promise<ITask | undefined>;
  findByIds(id: number[]): Promise<ITask[]>;
  findByIdWithHistories(id: number): Promise<ITask | undefined>;
  remove(task: ITask): Promise<void>;
  save(task: ITask): Promise<ITask>;
  saveAll(tasks: ITask[]): Promise<ITask[]>;
}
