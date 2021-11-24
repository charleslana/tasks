import ActionTaskInterface from './ActionTaskInterface';
import StateTaskInterface from './StateTaskInterface';
import { Dispatch } from 'react';

export default interface TaskContextInterface {
  dispatch?: Dispatch<ActionTaskInterface>;
  finishedTasks?: StateTaskInterface[];
  sortedTasks?: StateTaskInterface[];
  tasks?: StateTaskInterface[];
}
