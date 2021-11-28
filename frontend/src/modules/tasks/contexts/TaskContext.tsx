import IPropsContext from '../../../shared/models/IPropsContext';
import IStateTask from '../models/IStateTask';
import React, { createContext, useReducer } from 'react';
import TaskContextInterface from '../models/TaskContextInterface';
import taskReducer from '../reducers/TaskReducer';

export const TaskContext = createContext<TaskContextInterface>({});

const TaskContextProvider = (props: IPropsContext): JSX.Element => {
  const initialState: IStateTask[] = [];
  const [tasks, dispatch] = useReducer(taskReducer, initialState);
  const sortedTasks: IStateTask[] = tasks.sort((t: IStateTask, f: IStateTask) =>
    f.completed === t.completed ? 0 : f.completed ? -1 : 1
  );
  return (
    <TaskContext.Provider value={{ tasks, sortedTasks, dispatch }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
