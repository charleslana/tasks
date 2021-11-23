import React, { createContext, useReducer } from 'react';
import PropsContextInterface from '../../../shared/interfaces/PropsContextInterface';
import StateTaskInterface from '../interfaces/StateTaskInterface';
import TaskContextInterface from '../interfaces/TaskContextInterface';
import taskReducer from '../reducers/TaskReducer';

export const TaskContext = createContext<TaskContextInterface>({
  tasks: [],
});

const TaskContextProvider = (props: PropsContextInterface): JSX.Element => {
  const initialState: StateTaskInterface[] = [];
  const [tasks, dispatch] = useReducer(taskReducer, initialState);
  const sortedTasks: StateTaskInterface[] = tasks.sort(
    (t: StateTaskInterface, f: StateTaskInterface) =>
      f.completed === t.completed ? 0 : f.completed ? -1 : 1
  );
  return (
    <TaskContext.Provider value={{ tasks, sortedTasks, dispatch }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
