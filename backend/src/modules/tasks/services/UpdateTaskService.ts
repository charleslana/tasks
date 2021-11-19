import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import TaskStatusEnum from '../enumerations/TaskStatusEnum';
import StatusInterface from '../interfaces/StatusInterface';
import UpdateTaskInterface from '../interfaces/UpdateTaskInterface';
import Task from '../typeorm/entities/Task';
import { TaskRepository } from '../typeorm/repositories/TaskRepository';

class UpdateTaskService {
  public async execute({
    id,
    description,
  }: UpdateTaskInterface): Promise<Task> {
    const taskRepository = getCustomRepository(TaskRepository);
    const task = await taskRepository.findOne(id);
    if (!task) {
      throw new AppError('Tarefa não encontrada.');
    }
    if (task.status === TaskStatusEnum.YES) {
      throw new AppError(
        'Não é possível atualizar uma tarefa que já se encontra finalizada.'
      );
    }
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
    const task = await taskRepository.findOne(id);
    if (!task) {
      throw new AppError('Tarefa não encontrada.');
    }
    if (task.status === TaskStatusEnum.YES) {
      throw new AppError('A tarefa já se encontra finalizada.');
    }
    task.status = TaskStatusEnum.YES;
    await taskRepository.save(task);
    return task;
  }
}

export default UpdateTaskService;
