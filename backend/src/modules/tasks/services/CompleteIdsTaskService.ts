import AppError from '../../../shared/errors/AppError';
import Task from '../infra/typeorm/entities/Task';
import { ICompleteIdsTask } from '../domain/models/ICompleteIdsTask';
import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../domain/repositories/ITasksRepository';

@injectable()
class CompleteIdsTaskService {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository
  ) {}

  private checkStatus(task: Task | undefined) {
    if (task && task.completed) {
      throw new AppError(
        'Não é possível atualizar uma tarefa que já se encontra finalizada.'
      );
    }
  }

  public async execute({ ids }: ICompleteIdsTask): Promise<Task[]> {
    const tasks = await this.tasksRepository.findByIds(ids);
    if (tasks.length === 0) {
      throw new AppError('Nenhuma tarefa foi encontrada.');
    }
    for (let index = 0; index < tasks.length; index++) {
      this.checkStatus(tasks[index]);
      tasks[index].completed = true;
    }
    await this.tasksRepository.saveAll(tasks);
    return tasks;
  }
}

export default CompleteIdsTaskService;
