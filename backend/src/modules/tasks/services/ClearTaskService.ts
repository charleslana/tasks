import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../domain/repositories/ITasksRepository';

@injectable()
class ClearTaskService {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository
  ) {}

  public async execute(): Promise<void> {
    const task = await this.tasksRepository.count();
    if (!task) {
      throw new AppError('Nenhuma tarefa foi encontrada.');
    }
    await this.tasksRepository.clear();
  }
}

export default ClearTaskService;
