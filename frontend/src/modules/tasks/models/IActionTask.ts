import TaskEnum from '../enumerations/TaskEnum';

export default interface IActionTask {
  id?: number;
  task?: {
    id: number;
    description: string;
    completed: boolean;
    createdAt: Date;
  };
  type: TaskEnum;
}
