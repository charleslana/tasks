import Api from '../../../shared/config/Api';
import IStateTask from '../models/IStateTask';

const showTaskService = async (id: number): Promise<IStateTask> => {
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

const initialTask = (id: number): IStateTask => {
  const init = {
    id: id,
    description: '',
    completed: false,
    createdAt: new Date(),
  };
  return init;
};

export default showTaskService;
