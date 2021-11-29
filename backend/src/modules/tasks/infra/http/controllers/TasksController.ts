import ClearTaskService from '../../../services/ClearTaskService';
import CompleteIdsTaskService from '../../../services/CompleteIdsTaskService';
import CompleteTaskService from '../../../services/CompleteTaskService';
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
    const clearTaskService = container.resolve(ClearTaskService);
    await clearTaskService.execute();
    return response.status(204).json([]);
  }

  public async complete(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;
    const completeTaskService = container.resolve(CompleteTaskService);
    const task = await completeTaskService.execute({
      id: parseInt(id),
    });
    return response.json(instanceToPlain(task));
  }

  public async completeIds(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { completeIds } = request.body;
    const completeIdsTaskService = container.resolve(CompleteIdsTaskService);
    const tasks = await completeIdsTaskService.execute({
      ids: completeIds,
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

  public async list(request: Request, response: Response): Promise<Response> {
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
