import Api from '../../../shared/config/Api';
import StateTaskInterface from '../../../shared/interfaces/StateTaskInterface';

export const arrayCompletedTaskService = async (
  ids: number[]
): Promise<StateTaskInterface[]> => {
  let tasks: StateTaskInterface[] = [];
  await Api.put('/completed', {
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

const updateTaskService = async (
  task: StateTaskInterface
): Promise<StateTaskInterface> => {
  await Api.put(`/${task.id}`, {
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

export const completedTaskService = async (
  task: StateTaskInterface
): Promise<StateTaskInterface> => {
  await Api.put(`/completed/${task.id}`)
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
