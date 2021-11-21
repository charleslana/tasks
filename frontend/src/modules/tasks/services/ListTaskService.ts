import Api from '../../../shared/config/Api';
import StateTaskInterface from '../../../shared/interfaces/StateTaskInterface';

const listTaskService = async (): Promise<StateTaskInterface[]> => {
  let tasks: StateTaskInterface[] = [];

  await Api.get('/')
    .then(response => {
      tasks = response.data;
    })
    .catch(error => {
      throw new Error(error.message);
    });
  return tasks;
};

export default listTaskService;
