import AppError from '../../../shared/errors/AppError';
import DeleteTaskInterface from '../interfaces/DeleteTaskInterface';
import { TaskRepository } from '../typeorm/repositories/TaskRepository';
import { getCustomRepository } from 'typeorm';

class DeleteTaskService {
  public async clear(): Promise<void> {
    const taskRepository = getCustomRepository(TaskRepository);
    const task = await taskRepository.count();
    if (!task) {
      throw new AppError('Nenhuma tarefa foi encontrada.');
    }
    await taskRepository.clear();
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
