import FilterTaskEnum from '../enumerations/FilterTaskEnum';

export default interface PropsFilterTaskInterface {
  filterTask: (filter: FilterTaskEnum) => void;
  clearTasks: () => void;
}
