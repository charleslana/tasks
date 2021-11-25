import Api from '../../../shared/config/Api';
import StateTaskInterface from '../interfaces/StateTaskInterface';

const createTaskService = async (
  description: string
): Promise<StateTaskInterface> => {
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

const initialTask = (description: string): StateTaskInterface => {
  const init = {
    id: 0,
    description: description,
    completed: false,
    created_at: new Date(),
  };
  return init;
};

export default createTaskService;
