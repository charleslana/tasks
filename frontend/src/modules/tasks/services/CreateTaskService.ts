import Api from '../../../shared/config/Api';
import StateTaskInterface from '../../../shared/interfaces/StateTaskInterface';

const createTaskService = async (
  description: string
): Promise<StateTaskInterface> => {
  let task: StateTaskInterface = {
    id: 0,
    description: description,
    completed: false,
  };
  await Api.post('/', {
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

export default createTaskService;
