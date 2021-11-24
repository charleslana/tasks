import AppError from '../../../shared/errors/AppError';
import Task from '../typeorm/entities/Task';
import UpdateTaskInterface from '../interfaces/UpdateTaskInterface';
import { getCustomRepository } from 'typeorm';
import { TaskRepository } from '../typeorm/repositories/TaskRepository';
import CompletedTaskInterface, {
  ArrayCompletedTaskInterface,
} from '../interfaces/CompletedTaskInterface';

class UpdateTaskService {
  public async arrayCompleted({
    ids,
  }: ArrayCompletedTaskInterface): Promise<Task[]> {
    const taskRepository = getCustomRepository(TaskRepository);
    const tasks = await taskRepository.findByIds(ids);
    if (tasks.length === 0) {
      throw new AppError('Nenhuma tarefa foi encontrada.');
    }
    for (let index = 0; index < tasks.length; index++) {
      this.checkNotFound(tasks[index]);
      this.checkStatus(tasks[index]);
      tasks[index].completed = true;
    }
    await taskRepository.save(tasks);
    return tasks;
  }

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

  public async completed({ id }: CompletedTaskInterface): Promise<Task> {
    const taskRepository = getCustomRepository(TaskRepository);
    let task = await taskRepository.findOne(id);
    task = this.checkNotFound(task);
    this.checkStatus(task);
    task.completed = true;
    await taskRepository.save(task);
    return task;
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
}

export default UpdateTaskService;
