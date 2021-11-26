import Historic from '../entities/Historic';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Historic)
export class HistoricRepository extends Repository<Historic> {
  public async findByLastHistoric(
    taskId: number
  ): Promise<Historic | undefined> {
    return await this.createQueryBuilder('histories')
      .where('task_id = :taskId', {
        taskId: taskId,
      })
      .orderBy('created_at', 'DESC')
      .limit(1)
      .getOne();
  }
}
