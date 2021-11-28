import Task from '../../../tasks/infra/typeorm/entities/Task';

export interface IHistoric {
  id: number;
  description: string;
  created_at: Date;
  task: Task;
}
