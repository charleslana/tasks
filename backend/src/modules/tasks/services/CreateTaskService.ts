import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import CreateTaskInterface from '../interfaces/CreateTaskInterface';
import Task from '../typeorm/entities/Task';
import { TaskRepository } from '../typeorm/repositories/TaskRepository';

class CreateTaskService {
  public async execute({ description }: CreateTaskInterface): Promise<Task> {
    const taskRepository = getCustomRepository(TaskRepository);
    const taskExists = await taskRepository.findByDescription(description);
    if (taskExists) {
      throw new AppError('Já existe uma tarefa com a mesma descrição.');
    }
    const task = taskRepository.create({
      description,
    });
    await taskRepository.save(task);
    return task;
  }
}

export default CreateTaskService;
