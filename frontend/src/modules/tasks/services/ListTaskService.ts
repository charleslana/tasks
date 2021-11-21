import Api from '../../../shared/config/Api';
import StateTaskInterface from '../interfaces/StateTaskInterface';

const listTaskService = async (): Promise<StateTaskInterface[]> => {
  let tasks: StateTaskInterface[] = [];
  await Api.get('/task')
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

export default listTaskService;
