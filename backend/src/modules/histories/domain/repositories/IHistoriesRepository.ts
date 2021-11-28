import { ICreateHistoric } from '../models/ICreateHistoric';
import { IHistoric } from '../models/IHistoric';

export interface IHistoriesRepository {
  create(data: ICreateHistoric): Promise<IHistoric>;
  findByLastHistoric(id: number): Promise<IHistoric | undefined>;
}
