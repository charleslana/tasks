import AppError from '../../../shared/errors/AppError';
import { ICreateTask } from '../domain/models/ICreateTask';
import { inject, injectable } from 'tsyringe';
import { ITask } from '../domain/models/ITask';
import { ITasksRepository } from '../domain/repositories/ITasksRepository';

@injectable()
class CreateTaskService {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository
  ) {}

  public async execute({ description }: ICreateTask): Promise<ITask> {
    const taskExists = await this.tasksRepository.findByDescription(
      description
    );
    if (taskExists) {
      throw new AppError('Já existe uma tarefa com a mesma descrição.');
    }
    const task = await this.tasksRepository.create({
      description,
    });
    return task;
  }
}

export default CreateTaskService;
