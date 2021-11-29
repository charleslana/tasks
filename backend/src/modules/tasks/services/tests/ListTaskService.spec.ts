import 'reflect-metadata';
import CreateTaskService from '../CreateTaskService';
import ListTaskService from '../ListTaskService';
import { FakeTasksRepository } from '../../domain/repositories/fakes/FakeTasksRepository';

let fakeTasksRepository: FakeTasksRepository;
let createTaskService: CreateTaskService;
let listTaskService: ListTaskService;

describe('List Task', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    createTaskService = new CreateTaskService(fakeTasksRepository);
    listTaskService = new ListTaskService(fakeTasksRepository);
  });

  it('Should be able to list all tasks.', async () => {
    await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    const tasks = await listTaskService.execute();
    expect(tasks).toHaveLength(1);
  });
});
