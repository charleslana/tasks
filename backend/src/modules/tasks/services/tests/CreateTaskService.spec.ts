import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import CreateTaskService from '../CreateTaskService';
import { FakeTasksRepository } from '../../domain/repositories/fakes/FakeTasksRepository';

let fakeTasksRepository: FakeTasksRepository;
let createTaskService: CreateTaskService;

describe('Create Task', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    createTaskService = new CreateTaskService(fakeTasksRepository);
  });

  it('Should be able to create a new task.', async () => {
    const task = await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    expect(task).toHaveProperty('id');
  });

  it('Should not be able to create two tasks with the same description.', async () => {
    await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    expect(
      createTaskService.execute({
        description: 'Primeira tarefa',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
