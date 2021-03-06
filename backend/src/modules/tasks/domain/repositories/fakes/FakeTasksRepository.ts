import Task from '../../../infra/typeorm/entities/Task';
import { ICreateTask } from '../../../domain/models/ICreateTask';
import { ITasksRepository } from '../../../domain/repositories/ITasksRepository';

export class FakeTasksRepository implements ITasksRepository {
  private tasks: Task[] = [];
  private id = 1;

  public async clear(): Promise<void> {
    this.tasks = [];
  }

  public async count(): Promise<number> {
    return this.tasks.length;
  }

  public async create({ description }: ICreateTask): Promise<Task> {
    const task = new Task();
    task.id = this.id;
    task.description = description;
    task.completed = false;
    task.created_at = new Date();
    task.updated_at = new Date();
    this.tasks.push(task);
    this.id++;
    return task;
  }

  public async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  public async findByDescription(
    description: string
  ): Promise<Task | undefined> {
    const task = this.tasks.find(task => task.description === description);
    return task;
  }

  public async findById(id: number): Promise<Task | undefined> {
    const task = this.tasks.find(task => task.id === id);
    return task;
  }

  public async findByIds(ids: number[]): Promise<Task[]> {
    const tasks = this.tasks.filter(task => {
      return ids.indexOf(task.id) != -1;
    });
    return tasks;
  }

  public async findByIdWithHistories(id: number): Promise<Task | undefined> {
    const task = this.tasks.find(task => task.id === id);
    return task;
  }

  public async remove(task: Task): Promise<void> {
    this.tasks.filter(item => item.id !== task.id);
  }

  public async save(task: Task): Promise<Task> {
    const findIndex = this.tasks.findIndex(findTask => findTask.id === task.id);
    this.tasks[findIndex] = task;
    return task;
  }

  public async saveAll(tasks: Task[]): Promise<Task[]> {
    const tempTasks: Task[] = [];
    tasks.map(task => {
      const findIndex = this.tasks.findIndex(
        findTask => findTask.id === task.id
      );
      this.tasks[findIndex] = task;
      tempTasks.push(task);
    });
    return tempTasks;
  }
}
