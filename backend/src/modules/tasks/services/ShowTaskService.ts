import AppError from '../../../shared/errors/AppError';
import Task from '../infra/typeorm/entities/Task';
import { inject, injectable } from 'tsyringe';
import { IShowTask } from '../domain/models/IShowTask';
import { ITasksRepository } from '../domain/repositories/ITasksRepository';

@injectable()
class ShowTaskService {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository
  ) {}

  public async execute({ id }: IShowTask): Promise<Task> {
    const task = await this.tasksRepository.findByIdWithHistories(id);
    if (!task) {
      throw new AppError('Tarefa não encontrada.');
    }
    return task;
  }
}

export default ShowTaskService;
