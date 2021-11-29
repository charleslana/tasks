import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import CreateTaskService from '../CreateTaskService';
import ShowTaskService from '../ShowTaskService';
import { FakeTasksRepository } from '../../domain/repositories/fakes/FakeTasksRepository';

let fakeTasksRepository: FakeTasksRepository;
let createTaskService: CreateTaskService;
let showTaskService: ShowTaskService;

describe('Create Task', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    createTaskService = new CreateTaskService(fakeTasksRepository);
    showTaskService = new ShowTaskService(fakeTasksRepository);
  });

  it('Should be able to show a task.', async () => {
    const task = await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    const show = await showTaskService.execute({ id: task.id });
    expect(show).toMatchObject({ description: task.description, id: task.id });
  });

  it('Should not be able to show a task with a non-existent id.', async () => {
    expect(showTaskService.execute({ id: 0 })).rejects.toBeInstanceOf(AppError);
  });
});
