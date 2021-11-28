import IStateTask from '../models/IStateTask';
import TaskEnum from '../enumerations/TaskEnum';
import { TaskContext } from '../contexts/TaskContext';
import { useContext } from 'react';

export const taskService = (): {
  addTask: (task: IStateTask) => void | undefined;
  removeAllTask: () => void | undefined;
  checkTask: (task: IStateTask) => void | undefined;
  updateTask: (task: IStateTask) => void | undefined;
  removeTask: (id: number) => void | undefined;
  tasks: IStateTask[] | undefined;
  sortedTasks: IStateTask[] | undefined;
} => {
  const { tasks, sortedTasks, dispatch } = useContext(TaskContext);
  const addTask = (task: IStateTask) =>
    dispatch?.({
      type: TaskEnum.ADD_TASK,
      task: {
        id: task.id,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
      },
    });
  const checkTask = (task: IStateTask) =>
    dispatch?.({
      type: TaskEnum.CHECK_TASK,
      task: {
        id: task.id,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
      },
    });
  const removeAllTask = () =>
    dispatch?.({
      type: TaskEnum.REMOVE_ALL_TASK,
    });
  const removeTask = (id: number) =>
    dispatch?.({
      type: TaskEnum.REMOVE_TASK,
      id: id,
    });
  const updateTask = (task: IStateTask) =>
    dispatch?.({
      type: TaskEnum.UPDATE_TASK,
      task: {
        id: task.id,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
      },
    });
  return {
    tasks,
    sortedTasks,
    addTask,
    removeAllTask,
    checkTask,
    updateTask,
    removeTask,
  };
};
