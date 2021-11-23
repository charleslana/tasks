import TaskEnum from '../enumerations/TaskEnum';

export default interface ActionTaskInterface {
  id?: number;
  type: TaskEnum;
  task?: {
    id: number;
    description: string;
    completed: boolean;
  };
}
