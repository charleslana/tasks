import ActionTaskInterface from './ActionTaskInterface';
import { Dispatch } from 'react';
import StateTaskInterface from './StateTaskInterface';

export default interface TaskContextInterface {
  tasks: StateTaskInterface[];
  sortedTasks?: StateTaskInterface[];
  dispatch?: Dispatch<ActionTaskInterface>;
  finishedTasks?: StateTaskInterface[];
}
