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
        created_at: task.created_at,
      },
    });
  const checkTask = (task: StateTaskInterface) =>
    dispatch?.({
      type: TaskEnum.CHECK_TASK,
      task: {
        created_at: task.created_at,
        completed: task.completed,
        description: task.description,
        id: task.id,
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
        created_at: task.created_at,
        completed: task.completed,
        description: task.description,
        id: task.id,
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
