import Task from '../infra/typeorm/entities/Task';
import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../domain/repositories/ITasksRepository';

@injectable()
class ListTaskService {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository
  ) {}

  public async execute(): Promise<Task[] | undefined> {
    const tasks = await this.tasksRepository.findAll();
    return tasks;
  }
}

export default ListTaskService;
