import Api from '../../../shared/config/Api';
import IStateTask from '../models/IStateTask';

const listTaskService = async (): Promise<IStateTask[]> => {
  let tasks: IStateTask[] = [];
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
