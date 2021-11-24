import Task from '../typeorm/entities/Task';
import { getCustomRepository } from 'typeorm';
import { TaskRepository } from '../typeorm/repositories/TaskRepository';

class ListTaskService {
  public async execute(): Promise<Task[]> {
    const taskRepository = getCustomRepository(TaskRepository);
    const tasks = await taskRepository.find();
    return tasks;
  }
}

export default ListTaskService;
