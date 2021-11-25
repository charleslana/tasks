import Api from '../../../shared/config/Api';
import StateTaskInterface from '../interfaces/StateTaskInterface';

const showTaskService = async (id: number): Promise<StateTaskInterface> => {
  let task = initialTask(id);
  await Api.get(`/task/${id}`)
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

const initialTask = (id: number): StateTaskInterface => {
  const init = {
    id: id,
    description: '',
    completed: false,
    createdAt: new Date(),
  };
  return init;
};

export default showTaskService;
