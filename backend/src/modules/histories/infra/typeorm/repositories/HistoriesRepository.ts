import Historic from '../entities/Historic';
import { getRepository, Repository } from 'typeorm';
import { ICreateHistoric } from '../../../domain/models/ICreateHistoric';
import { IHistoriesRepository } from '../../../domain/repositories/IHistoriesRepository';

export class HistoriesRepository implements IHistoriesRepository {
  private ormRepository: Repository<Historic>;

  constructor() {
    this.ormRepository = getRepository(Historic);
  }

  public async create({
    description,
    task,
  }: ICreateHistoric): Promise<Historic> {
    const historic = this.ormRepository.create({ description, task });
    await this.ormRepository.save(historic);
    return historic;
  }

  public async findByLastHistoric(id: number): Promise<Historic | undefined> {
    return await this.ormRepository
      .createQueryBuilder('histories')
      .where('task_id = :taskId', {
        taskId: id,
      })
      .orderBy('created_at', 'DESC')
      .limit(1)
      .getOne();
  }
}
