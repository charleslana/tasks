import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import CompleteIdsTaskService from '../CompleteIdsTaskService';
import CreateTaskService from '../CreateTaskService';
import { FakeTasksRepository } from '../../domain/repositories/fakes/FakeTasksRepository';

let fakeTasksRepository: FakeTasksRepository;
let createTaskService: CreateTaskService;
let completeIdsTaskService: CompleteIdsTaskService;

describe('Complete Task List Ids', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    createTaskService = new CreateTaskService(fakeTasksRepository);
    completeIdsTaskService = new CompleteIdsTaskService(fakeTasksRepository);
  });

  it('Should be able to complete a to-do list.', async () => {
    const firstTask = await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    const secondTask = await createTaskService.execute({
      description: 'Segunda tarefa',
    });
    const completeIds = await completeIdsTaskService.execute({
      ids: [firstTask.id, secondTask.id],
    });
    expect(completeIds).toEqual(
      expect.arrayContaining([expect.objectContaining({ completed: true })])
    );
  });

  it('Should not be able to complete a to-do list with a non-existent ids.', async () => {
    expect(
      completeIdsTaskService.execute({ ids: [0, 1] })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to complete a to-do list that has already been completed.', async () => {
    const task = await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    task.completed = true;
    expect(
      completeIdsTaskService.execute({ ids: [task.id] })
    ).rejects.toBeInstanceOf(AppError);
  });
});
