import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import ClearTaskService from '../ClearTaskService';
import CreateTaskService from '../CreateTaskService';
import { FakeTasksRepository } from '../../domain/repositories/fakes/FakeTasksRepository';

let fakeTasksRepository: FakeTasksRepository;
let createTaskService: CreateTaskService;
let clearTaskService: ClearTaskService;

describe('Clear Tasks', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    createTaskService = new CreateTaskService(fakeTasksRepository);
    clearTaskService = new ClearTaskService(fakeTasksRepository);
  });

  it('Should be able to delete all the tasks.', async () => {
    await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    expect(clearTaskService.execute()).resolves.not.toThrow();
  });

  it('Should not be able to delete all tasks if they do not exist.', async () => {
    expect(clearTaskService.execute()).rejects.toBeInstanceOf(AppError);
  });
});
