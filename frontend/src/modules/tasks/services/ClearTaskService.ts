import Api from '../../../shared/config/Api';

export const clearTaskService = async (): Promise<void> => {
  await Api.delete('/task')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response !== undefined) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    });
};

export default clearTaskService;
