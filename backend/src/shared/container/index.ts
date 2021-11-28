import { container } from 'tsyringe';
import { HistoriesRepository } from '../../modules/histories/infra/typeorm/repositories/HistoriesRepository';
import { IHistoriesRepository } from '../../modules/histories/domain/repositories/IHistoriesRepository';
import { ITasksRepository } from '../../modules/tasks/domain/repositories/ITasksRepository';
import { TasksRepository } from '../../modules/tasks/infra/typeorm/repositories/TasksRepository';

container.registerSingleton<ITasksRepository>(
  'TasksRepository',
  TasksRepository
);

container.registerSingleton<IHistoriesRepository>(
  'HistoriesRepository',
  HistoriesRepository
);
