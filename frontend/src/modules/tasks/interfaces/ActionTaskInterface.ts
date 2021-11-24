import TaskEnum from '../enumerations/TaskEnum';

export default interface ActionTaskInterface {
  id?: number;
  task?: {
    created_at: Date;
    completed: boolean;
    description: string;
    id: number;
  };
  type: TaskEnum;
}
