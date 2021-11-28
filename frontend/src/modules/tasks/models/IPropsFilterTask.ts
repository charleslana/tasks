import FilterTaskEnum from '../enumerations/FilterTaskEnum';

export default interface IPropsFilterTask {
  filterTask: (filter: FilterTaskEnum) => void;
  clearTasks: () => void;
}
