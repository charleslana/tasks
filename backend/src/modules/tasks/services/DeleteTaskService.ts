import AppError from '../../../shared/errors/AppError';
import { IDeleteTask } from '../domain/models/IDeleteTask';
import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../domain/repositories/ITasksRepository';

@injectable()
class DeleteTaskService {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository
  ) {}

  public async execute({ id }: IDeleteTask): Promise<void> {
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new AppError('Tarefa não encontrada.');
    }
    await this.tasksRepository.remove(task);
  }
}

export default DeleteTaskService;
