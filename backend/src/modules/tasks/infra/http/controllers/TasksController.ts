import CreateHistoricService from '../../../../histories/services/CreateHistoricService';
import CreateTaskService from '../../../services/CreateTaskService';
import DeleteTaskService from '../../../services/DeleteTaskService';
import ListTaskService from '../../../services/ListTaskService';
import ShowTaskService from '../../../services/ShowTaskService';
import UpdateTaskService from '../../../services/UpdateTaskService';
import { container } from 'tsyringe';
import { instanceToInstance, instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';

export default class TasksController {
  public async clear(request: Request, response: Response): Promise<Response> {
    const deleteTaskService = container.resolve(DeleteTaskService);
    await deleteTaskService.clear();
    return response.status(204).json([]);
  }

  public async completed(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;
    const updateTaskService = container.resolve(UpdateTaskService);
    const task = await updateTaskService.completed({
      id: parseInt(id),
    });
    return response.json(instanceToPlain(task));
  }

  public async completedIds(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { idsCompleted } = request.body;
    const updateTaskService = container.resolve(UpdateTaskService);
    const tasks = await updateTaskService.completedIds({
      ids: idsCompleted,
    });
    return response.json(instanceToPlain(tasks));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;
    const createTaskService = container.resolve(CreateTaskService);
    const task = await createTaskService.execute({ description: description });
    const createHistoricService = container.resolve(CreateHistoricService);
    await createHistoricService.execute({
      description: description,
      task: task,
    });
    return response.status(201).json(instanceToPlain(task));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteTaskService = container.resolve(DeleteTaskService);
    await deleteTaskService.execute({
      id: parseInt(id),
    });
    return response.status(204).json([]);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listTaskService = container.resolve(ListTaskService);
    const tasks = await listTaskService.execute();
    return response.json(instanceToPlain(tasks));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showTaskService = container.resolve(ShowTaskService);
    const task = await showTaskService.execute({ id: parseInt(id) });
    return response.json(instanceToInstance(task));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;
    const { id } = request.params;
    const updateTaskService = container.resolve(UpdateTaskService);
    const task = await updateTaskService.execute({
      id: parseInt(id),
      description: description,
    });
    const createHistoricService = container.resolve(CreateHistoricService);
    await createHistoricService.execute({
      description: description,
      task: task,
    });
    return response.json(instanceToPlain(task));
  }
}
