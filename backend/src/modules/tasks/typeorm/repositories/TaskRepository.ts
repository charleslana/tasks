import { EntityRepository, Repository } from 'typeorm';
import Task from '../entities/Task';

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
}
