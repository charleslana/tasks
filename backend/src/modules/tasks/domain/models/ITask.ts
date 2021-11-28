import Historic from '../../../histories/infra/typeorm/entities/Historic';

export interface ITask {
  id: number;
  description: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
  histories_task: Historic[];
}
