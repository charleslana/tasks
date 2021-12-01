import AppError from '../../../shared/errors/AppError';
import Task from '../infra/typeorm/entities/Task';
import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../domain/repositories/ITasksRepository';
import { IUpdateTask } from '../domain/models/IUpdateTask';

@injectable()
class UpdateTaskService {
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

  public async execute({ id, description }: IUpdateTask): Promise<Task> {
    let task = await this.tasksRepository.findById(id);
    task = this.checkNotFound(task);
    this.checkStatus(task);
    const taskExists = await this.tasksRepository.findByDescription(
      description
    );
    if (taskExists && description !== task.description) {
      throw new AppError('Já existe uma tarefa com a mesma descrição.');
    }
    task.description = description;
    await this.tasksRepository.save(task);
    return task;
  }
}

export default UpdateTaskService;
