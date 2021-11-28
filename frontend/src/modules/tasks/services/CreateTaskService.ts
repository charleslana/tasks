import Api from '../../../shared/config/Api';
import IStateTask from '../models/IStateTask';

const createTaskService = async (description: string): Promise<IStateTask> => {
  let task = initialTask(description);
  await Api.post('/task', {
    description: description,
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

const initialTask = (description: string): IStateTask => {
  const init = {
    id: 0,
    description: description,
    completed: false,
    createdAt: new Date(),
  };
  return init;
};

export default createTaskService;
