import AppError from '../../../shared/errors/AppError';
import Task from '../infra/typeorm/entities/Task';
import { ICompleteTask } from '../domain/models/ICompleteTask';
import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../domain/repositories/ITasksRepository';

@injectable()
class CompleteTaskService {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository
  ) {}

  private checkNotFound(task: Task | undefined) {
    if (!task) {
      throw new AppError('Tarefa não encontrada.');
    }
    return task;
  }

  private checkStatus(task: Task | undefined) {
    if (task && task.completed) {
      throw new AppError(
        'Não é possível atualizar uma tarefa que já se encontra finalizada.'
      );
    }
  }

  public async execute({ id }: ICompleteTask): Promise<Task> {
    let task = await this.tasksRepository.findById(id);
    task = this.checkNotFound(task);
    this.checkStatus(task);
    task.completed = true;
    await this.tasksRepository.save(task);
    return task;
  }
}

export default CompleteTaskService;
