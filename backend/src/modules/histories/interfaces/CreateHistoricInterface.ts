import Task from '../../tasks/typeorm/entities/Task';

export default interface CreateHistoricInterface {
  description: string;
  task: Task;
}
