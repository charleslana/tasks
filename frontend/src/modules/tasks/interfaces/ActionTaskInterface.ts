import TaskEnum from '../enumerations/TaskEnum';

export default interface ActionTaskInterface {
  id?: number;
  task?: {
    id: number;
    description: string;
    completed: boolean;
    created_at: Date;
  };
  type: TaskEnum;
}
