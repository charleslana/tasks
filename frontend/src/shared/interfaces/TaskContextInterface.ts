import ActionInterface from './ActionInterface';
import { Dispatch } from 'react';
import StateInterface from './StateInterface';

export default interface TaskContextInterface {
  tasks: StateInterface[];
  sortedTasks?: StateInterface[];
  dispatch?: Dispatch<ActionInterface>;
  finishedTasks?: StateInterface[];
}
