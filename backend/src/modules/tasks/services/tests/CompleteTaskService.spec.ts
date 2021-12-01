import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import CompleteTaskService from '../CompleteTaskService';
import CreateTaskService from '../CreateTaskService';
import { FakeTasksRepository } from '../../domain/repositories/fakes/FakeTasksRepository';

let fakeTasksRepository: FakeTasksRepository;
let createTaskService: CreateTaskService;
let completeTaskService: CompleteTaskService;

describe('Complete Task', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    createTaskService = new CreateTaskService(fakeTasksRepository);
    completeTaskService = new CompleteTaskService(fakeTasksRepository);
  });

  it('Should be able to complete a task.', async () => {
    const task = await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    const show = await completeTaskService.execute({ id: task.id });
    expect(show).toMatchObject({ description: task.description, id: task.id });
  });

  it('Should not be able to complete a task with a non-existent id.', async () => {
    expect(completeTaskService.execute({ id: 0 })).rejects.toBeInstanceOf(
      AppError
    );
  });

  it('Should not be able to complete a task that has already been completed.', async () => {
    const task = await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    task.completed = true;
    expect(completeTaskService.execute({ id: task.id })).rejects.toBeInstanceOf(
      AppError
    );
  });
});
