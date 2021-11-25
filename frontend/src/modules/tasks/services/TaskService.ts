import StateTaskInterface from '../interfaces/StateTaskInterface';
import TaskEnum from '../enumerations/TaskEnum';
import { TaskContext } from '../contexts/TaskContext';
import { useContext } from 'react';

export const taskService = (): {
  addTask: (task: StateTaskInterface) => void | undefined;
  removeAllTask: () => void | undefined;
  checkTask: (task: StateTaskInterface) => void | undefined;
  updateTask: (task: StateTaskInterface) => void | undefined;
  removeTask: (id: number) => void | undefined;
  tasks: StateTaskInterface[] | undefined;
  sortedTasks: StateTaskInterface[] | undefined;
} => {
  const { tasks, sortedTasks, dispatch } = useContext(TaskContext);
  const addTask = (task: StateTaskInterface) =>
    dispatch?.({
      type: TaskEnum.ADD_TASK,
      task: {
        id: task.id,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
      },
    });
  const checkTask = (task: StateTaskInterface) =>
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
  const updateTask = (task: StateTaskInterface) =>
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
