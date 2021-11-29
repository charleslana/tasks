import Api from '../../../shared/config/Api';
import IStateTask from '../models/IStateTask';

export const completeIdsTaskService = async (
  ids: number[]
): Promise<IStateTask[]> => {
  let tasks: IStateTask[] = [];
  await Api.put('/task/complete', {
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

export default completeIdsTaskService;
