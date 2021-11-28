import IActionTask from './IActionTask';
import IStateTask from './IStateTask';
import { Dispatch } from 'react';

export default interface TaskContextInterface {
  dispatch?: Dispatch<IActionTask>;
  finishedTasks?: IStateTask[];
  sortedTasks?: IStateTask[];
  tasks?: IStateTask[];
}
