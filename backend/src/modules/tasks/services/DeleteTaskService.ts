import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import DeleteTaskInterface from '../interfaces/DeleteTaskInterface';
import { TaskRepository } from '../typeorm/repositories/TaskRepository';

class DeleteTaskService {
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
