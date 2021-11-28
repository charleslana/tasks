import Task from '../../../tasks/infra/typeorm/entities/Task';

export interface ICreateHistoric {
  description: string;
  task: Task;
}
