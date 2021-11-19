import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import ShowTaskInterface from '../interfaces/ShowTaskInterface';
import Task from '../typeorm/entities/Task';
import { TaskRepository } from '../typeorm/repositories/TaskRepository';

class ShowTaskService {
  public async execute({ id }: ShowTaskInterface): Promise<Task> {
    const taskRepository = getCustomRepository(TaskRepository);
    const task = await taskRepository.findOne(id);
    if (!task) {
      throw new AppError('Tarefa não encontrada.');
    }
    return task;
  }
}

export default ShowTaskService;
