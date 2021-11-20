import React, { createContext, useReducer } from 'react';
import PropsInterface from '../interfaces/PropsInterface';
import StateInterface from '../interfaces/StateInterface';
import TaskContextInterface from '../interfaces/TaskContextInterface';
import taskReducer from '../reducers/TaskReducer';

export const TaskContext = createContext<TaskContextInterface>({
  tasks: [],
});

const TaskContextProvider = (props: PropsInterface): any => {
  const initialState: StateInterface[] = [];
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  const sortedTasks = tasks.sort((t: any, f: any) =>
    f.isChecked === t.isChecked ? 0 : f.isChecked ? -1 : 1
  );

  return (
    <TaskContext.Provider value={{ tasks, sortedTasks, dispatch }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
