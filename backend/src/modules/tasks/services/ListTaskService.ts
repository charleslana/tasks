import { getCustomRepository } from 'typeorm';
import Task from '../typeorm/entities/Task';
import { TaskRepository } from '../typeorm/repositories/TaskRepository';

class ListTaskService {
  public async execute(): Promise<Task[]> {
    const taskRepository = getCustomRepository(TaskRepository);
    const tasks = await taskRepository.find();
    return tasks;
  }
}

export default ListTaskService;
