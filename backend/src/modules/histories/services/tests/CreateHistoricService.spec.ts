import 'reflect-metadata';
import CreateHistoricService from '../CreateHistoricService';
import CreateTaskService from '../../../tasks/services/CreateTaskService';
import { FakeHistoriesRepository } from '../../domain/repositories/fakes/FakeHistoriesRepository';
import { FakeTasksRepository } from '../../../tasks/domain/repositories/fakes/FakeTasksRepository';

let fakeHistoriesRepository: FakeHistoriesRepository;
let createHistoricService: CreateHistoricService;
let fakeTasksRepository: FakeTasksRepository;
let createTaskService: CreateTaskService;

describe('Create Historic', () => {
  beforeEach(() => {
    fakeHistoriesRepository = new FakeHistoriesRepository();
    createHistoricService = new CreateHistoricService(fakeHistoriesRepository);
    fakeTasksRepository = new FakeTasksRepository();
    createTaskService = new CreateTaskService(fakeTasksRepository);
  });

  it('Should be able to create a new history when the task is initially created.', async () => {
    const task = await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    const historic = await createHistoricService.execute({
      description: 'Primeira tarefa',
      task,
    });
    expect(historic).toBeUndefined();
  });

  it('Should be able to create a new history with a description different from the previous one.', async () => {
    const task = await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    fakeHistoriesRepository.create({ description: 'Primeira tarefa', task });
    const historic = await createHistoricService.execute({
      description: 'Segunda tarefa',
      task,
    });
    expect(historic).toBeUndefined();
  });
});
