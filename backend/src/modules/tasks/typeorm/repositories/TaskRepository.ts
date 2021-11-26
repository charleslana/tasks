import Task from '../entities/Task';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  public async findByDescription(
    description: string
  ): Promise<Task | undefined> {
    const task = this.findOne({
      where: {
        description,
      },
    });
    return task;
  }

  public async findByIdWithHistories(id: number): Promise<Task | undefined> {
    return await this.createQueryBuilder('tasks')
      .select(['tasks', 'histories_task'])
      .leftJoin('tasks.histories_task', 'histories_task')
      .where({ id })
      .getOne();
  }
}
