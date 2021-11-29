import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import CreateTaskService from '../CreateTaskService';
import DeleteTaskService from '../DeleteTaskService';
import { FakeTasksRepository } from '../../domain/repositories/fakes/FakeTasksRepository';

let fakeTasksRepository: FakeTasksRepository;
let createTaskService: CreateTaskService;
let deleteTaskService: DeleteTaskService;

describe('Delete Task', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    createTaskService = new CreateTaskService(fakeTasksRepository);
    deleteTaskService = new DeleteTaskService(fakeTasksRepository);
  });

  it('Should be able to delete a task.', async () => {
    await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    expect(deleteTaskService.execute({ id: 1 })).resolves.not.toThrow();
  });

  it('Should not be able to delete a task with a non-existent id.', async () => {
    expect(deleteTaskService.execute({ id: 0 })).rejects.toBeInstanceOf(
      AppError
    );
  });

  it('Should be able to delete all the tasks.', async () => {
    await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    expect(deleteTaskService.clear()).resolves.not.toThrow();
  });

  it('Should not be able to delete all tasks if they do not exist.', async () => {
    expect(deleteTaskService.clear()).rejects.toBeInstanceOf(AppError);
  });
});
