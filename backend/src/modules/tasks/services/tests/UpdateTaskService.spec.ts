import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import CompleteTaskService from '../CompleteTaskService';
import CreateTaskService from '../CreateTaskService';
import UpdateTaskService from '../UpdateTaskService';
import { FakeTasksRepository } from '../../domain/repositories/fakes/FakeTasksRepository';

let fakeTasksRepository: FakeTasksRepository;
let createTaskService: CreateTaskService;
let updateTaskService: UpdateTaskService;
let completeTaskService: CompleteTaskService;

describe('Update Task', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    createTaskService = new CreateTaskService(fakeTasksRepository);
    updateTaskService = new UpdateTaskService(fakeTasksRepository);
    completeTaskService = new CompleteTaskService(fakeTasksRepository);
  });

  it('Should be able to update a task.', async () => {
    const task = await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    const update = await updateTaskService.execute({
      id: task.id,
      description: 'Tarefa atualizada',
    });
    expect(update).toMatchObject({
      description: 'Tarefa atualizada',
      id: task.id,
    });
  });

  it('Should not be able to update a task with a non-existent id.', async () => {
    expect(
      updateTaskService.execute({ id: 0, description: '' })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update two tasks with the same description.', async () => {
    const task = await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    await createTaskService.execute({
      description: 'Segunda tarefa',
    });
    expect(
      updateTaskService.execute({
        id: task.id,
        description: 'Segunda tarefa',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update a task that has already been completed.', async () => {
    const task = await createTaskService.execute({
      description: 'Primeira tarefa',
    });
    await completeTaskService.execute({ id: task.id });
    expect(
      updateTaskService.execute({
        id: task.id,
        description: 'Tarefa atualizada',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
