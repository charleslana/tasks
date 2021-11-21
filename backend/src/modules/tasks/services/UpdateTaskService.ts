import AppError from '../../../shared/errors/AppError';
import StatusTaskInterface from '../interfaces/StatusTaskInterface';
import Task from '../typeorm/entities/Task';
import { TaskRepository } from '../typeorm/repositories/TaskRepository';
import UpdateTaskInterface from '../interfaces/UpdateTaskInterface';
import { getCustomRepository } from 'typeorm';

class UpdateTaskService {
  private checkNotFound(task: Task | undefined) {
    if (!task) {
      throw new AppError('Tarefa não encontrada.');
    }
    return task;
  }

  private checkStatus(task: Task | undefined) {
    if (task?.completed) {
      throw new AppError(
        'Não é possível atualizar uma tarefa que já se encontra finalizada.'
      );
    }
  }

  public async execute({
    id,
    description,
  }: UpdateTaskInterface): Promise<Task> {
    const taskRepository = getCustomRepository(TaskRepository);
    let task = await taskRepository.findOne(id);
    task = this.checkNotFound(task);
    this.checkStatus(task);
    const taskExists = await taskRepository.findByDescription(description);
    if (taskExists && description !== task.description) {
      throw new AppError('Já existe uma tarefa com a mesma descrição.');
    }
    task.description = description;
    await taskRepository.save(task);
    return task;
  }

  public async finish({ id }: StatusTaskInterface): Promise<Task> {
    const taskRepository = getCustomRepository(TaskRepository);
    let task = await taskRepository.findOne(id);
    task = this.checkNotFound(task);
    this.checkStatus(task);
    task.completed = true;
    await taskRepository.save(task);
    return task;
  }
}

export default UpdateTaskService;
