import Api from '../../../shared/config/Api';
import IStateTask from '../models/IStateTask';

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
