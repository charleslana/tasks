import ActionEnum from '../enumerations/ActionEnum';

export default interface ActionTaskInterface {
  id?: number;
  type: ActionEnum;
  task?: {
    id: number;
    description: string;
    completed: boolean;
  };
}
