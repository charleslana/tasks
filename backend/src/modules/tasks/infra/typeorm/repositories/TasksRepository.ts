import Task from '../entities/Task';
import { getRepository, Repository } from 'typeorm';
import { ITasksRepository } from '../../../domain/repositories/ITasksRepository';
import { ICreateTask } from '../../../domain/models/ICreateTask';

export class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  public async clear(): Promise<void> {
    await this.ormRepository.createQueryBuilder('tasks').delete().execute();
  }

  public async count(): Promise<number> {
    return await this.ormRepository.count();
  }

  public async create({ description }: ICreateTask): Promise<Task> {
    const task = this.ormRepository.create({ description });
    await this.ormRepository.save(task);
    return task;
  }

  public async findAll(): Promise<Task[]> {
    const tasks = await this.ormRepository.find();
    return tasks;
  }

  public async findByDescription(
    description: string
  ): Promise<Task | undefined> {
    const task = this.ormRepository.findOne({
      where: {
        description,
      },
    });
    return task;
  }

  public async findById(id: number): Promise<Task | undefined> {
    const task = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return task;
  }

  public async findByIds(ids: number[]): Promise<Task[]> {
    const tasks = await this.ormRepository.findByIds(ids);
    return tasks;
  }

  public async findByIdWithHistories(id: number): Promise<Task | undefined> {
    return await this.ormRepository
      .createQueryBuilder('tasks')
      .select(['tasks', 'histories_task'])
      .leftJoin('tasks.histories_task', 'histories_task')
      .where({ id })
      .getOne();
  }

  public async remove(task: Task): Promise<void> {
    await this.ormRepository.remove(task);
  }

  public async save(task: Task): Promise<Task> {
    await this.ormRepository.save(task);
    return task;
  }

  public async saveAll(tasks: Task[]): Promise<Task[]> {
    await this.ormRepository.save(tasks);
    return tasks;
  }
}
