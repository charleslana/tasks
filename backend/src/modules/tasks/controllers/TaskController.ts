import { Request, Response } from 'express';
import CreateTaskService from '../services/CreateTaskService';
import DeleteTaskService from '../services/DeleteTaskService';
import ListTaskService from '../services/ListTaskService';
import ShowTaskService from '../services/ShowTaskService';
import UpdateTaskService from '../services/UpdateTaskService';

export default class TaskController {
  public async clear(request: Request, response: Response): Promise<Response> {
    const deleteTaskService = new DeleteTaskService();
    await deleteTaskService.clear();
    return response.status(204).json([]);
  }

  public async completed(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;
    const updateTaskService = new UpdateTaskService();
    const task = await updateTaskService.completed({
      id: parseInt(id),
    });
    return response.json(task);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;
    const createTaskService = new CreateTaskService();
    const task = await createTaskService.execute({ description: description });
    return response.status(201).json(task);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteTaskService = new DeleteTaskService();
    await deleteTaskService.execute({
      id: parseInt(id),
    });
    return response.status(204).json([]);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listTaskService = new ListTaskService();
    const tasks = await listTaskService.execute();
    return response.json(tasks);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showTaskService = new ShowTaskService();
    const task = await showTaskService.execute({ id: parseInt(id) });
    return response.json(task);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;
    const { id } = request.params;
    const updateTaskService = new UpdateTaskService();
    const task = await updateTaskService.execute({
      id: parseInt(id),
      description: description,
    });
    return response.json(task);
  }
}
