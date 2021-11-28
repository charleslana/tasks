import Api from '../../../shared/config/Api';
import IStateTask from '../models/IStateTask';

export const arrayCompletedTaskService = async (
  ids: number[]
): Promise<IStateTask[]> => {
  let tasks: IStateTask[] = [];
  await Api.put('/task/completed', {
    idsCompleted: ids,
  })
    .then(response => {
      tasks = response.data;
    })
    .catch(error => {
      if (error.response !== undefined) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    });
  return tasks;
};

export const completedTaskService = async (
  task: IStateTask
): Promise<IStateTask> => {
  await Api.put(`/task/completed/${task.id}`)
    .then(response => {
      task = response.data;
    })
    .catch(error => {
      if (error.response !== undefined) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    });
  return task;
};

const updateTaskService = async (task: IStateTask): Promise<IStateTask> => {
  await Api.put(`/task/${task.id}`, {
    description: task.description,
  })
    .then(response => {
      task = response.data;
    })
    .catch(error => {
      if (error.response !== undefined) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    });
  return task;
};

export default updateTaskService;
