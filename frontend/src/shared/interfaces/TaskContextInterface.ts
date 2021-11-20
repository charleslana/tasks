import { Dispatch } from 'react';
import ActionInterface from './ActionInterface';
import StateInterface from './StateInterface';

export default interface TaskContextInterface {
  tasks: StateInterface[];
  sortedTasks?: any;
  dispatch?: Dispatch<ActionInterface>;
}
