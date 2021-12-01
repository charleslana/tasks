import { ICreateHistoric } from '../domain/models/ICreateHistoric';
import { IHistoriesRepository } from '../domain/repositories/IHistoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateHistoricService {
  constructor(
    @inject('HistoriesRepository')
    private historiesRepository: IHistoriesRepository
  ) {}

  public async execute({ description, task }: ICreateHistoric): Promise<void> {
    const lastHistoricExists =
      await this.historiesRepository.findByLastHistoric(task.id);
    if (lastHistoricExists && lastHistoricExists.description !== description) {
      await this.historiesRepository.create({
        description,
        task: task,
      });
    }
  }
}

export default CreateHistoricService;
