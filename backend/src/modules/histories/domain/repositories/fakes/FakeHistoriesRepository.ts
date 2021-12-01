import Historic from '../../../infra/typeorm/entities/Historic';
import Task from '../../../../tasks/infra/typeorm/entities/Task';
import { ICreateHistoric } from '../../models/ICreateHistoric';
import { IHistoriesRepository } from '../IHistoriesRepository';

export class FakeHistoriesRepository implements IHistoriesRepository {
  private histories: Historic[] = [];
  private id = 1;

  public async create({ description }: ICreateHistoric): Promise<Historic> {
    const historic = new Historic();
    const task = new Task();
    historic.id = this.id;
    historic.description = description;
    task.id = this.id;
    task.description = description;
    task.completed = false;
    task.created_at = new Date();
    task.updated_at = new Date();
    historic.task = task;
    this.histories.push(historic);
    this.id++;
    return historic;
  }

  public async findByLastHistoric(id: number): Promise<Historic | undefined> {
    const historic = this.histories.find(historic => historic.task.id === id);
    return historic;
  }
}
