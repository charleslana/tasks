import React, { createContext, useReducer } from 'react';
import PropsInterface from '../interfaces/PropsInterface';
import StateInterface from '../interfaces/StateInterface';
import TaskContextInterface from '../interfaces/TaskContextInterface';
import taskReducer from '../reducers/TaskReducer';

export const TaskContext = createContext<TaskContextInterface>({
  tasks: [],
});

const TaskContextProvider = (props: PropsInterface): JSX.Element => {
  const initialState: StateInterface[] = [];
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  const sortedTasks: StateInterface[] = tasks.sort(
    (t: StateInterface, f: StateInterface) =>
      f.completed === t.completed ? 0 : f.completed ? -1 : 1
  );

  return (
    <TaskContext.Provider value={{ tasks, sortedTasks, dispatch }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
