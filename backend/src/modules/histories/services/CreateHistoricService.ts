import CreateHistoricInterface from '../interfaces/CreateHistoricInterface';
import { getCustomRepository } from 'typeorm';
import { HistoricRepository } from '../typeorm/repositories/HistoricRepository';

class CreateHistoricService {
  public async execute({
    description,
    task,
  }: CreateHistoricInterface): Promise<void> {
    const historicRepository = getCustomRepository(HistoricRepository);
    const lastHistoricExists = await historicRepository.findByLastHistoric(
      task.id
    );
    if (lastHistoricExists?.description !== description) {
      const historic = historicRepository.create({
        description,
        task: task,
      });
      await historicRepository.save(historic);
    }
  }
}

export default CreateHistoricService;
