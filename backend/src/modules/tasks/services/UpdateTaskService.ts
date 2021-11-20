import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import TaskStatusEnum from '../enumerations/TaskStatusEnum';
import StatusInterface from '../interfaces/StatusInterface';
import UpdateTaskInterface from '../interfaces/UpdateTaskInterface';
import Task from '../typeorm/entities/Task';
import { TaskRepository } from '../typeorm/repositories/TaskRepository';

class UpdateTaskService {
  private checkNotFound(task: Task | undefined) {
    if (!task) {
      throw new AppError('Tarefa não encontrada.');
    }
    return task;
  }

  private checkStatus(task: Task | undefined) {
    if (task?.status === TaskStatusEnum.YES) {
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

  public async finished({ id }: StatusInterface): Promise<Task> {
    const taskRepository = getCustomRepository(TaskRepository);
    let task = await taskRepository.findOne(id);
    task = this.checkNotFound(task);
    this.checkStatus(task);
    task.status = TaskStatusEnum.YES;
    await taskRepository.save(task);
    return task;
  }
}

export default UpdateTaskService;
