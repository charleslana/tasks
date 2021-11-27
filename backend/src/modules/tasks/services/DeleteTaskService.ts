import AppError from '../../../shared/errors/AppError';
import DeleteTaskInterface from '../interfaces/DeleteTaskInterface';
import { getCustomRepository } from 'typeorm';
import { TaskRepository } from '../typeorm/repositories/TaskRepository';

class DeleteTaskService {
  public async clear(): Promise<void> {
    const taskRepository = getCustomRepository(TaskRepository);
    const task = await taskRepository.count();
    if (!task) {
      throw new AppError('Nenhuma tarefa foi encontrada.');
    }
    await taskRepository.clearTasks();
  }

  public async execute({ id }: DeleteTaskInterface): Promise<void> {
    const taskRepository = getCustomRepository(TaskRepository);
    const task = await taskRepository.findOne(id);
    if (!task) {
      throw new AppError('Tarefa não encontrada.');
    }
    await taskRepository.remove(task);
  }
}

export default DeleteTaskService;
