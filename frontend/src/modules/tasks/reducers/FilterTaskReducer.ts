import FilterTaskEnum from '../enumerations/FilterTaskEnum';
import StateTaskInterface from '../interfaces/StateTaskInterface';

const FilterTaskReducer = (
  state: StateTaskInterface[],
  action: FilterTaskEnum
): StateTaskInterface[] => {
  switch (action) {
    case FilterTaskEnum.SHOW_ALL:
      return state;
    case FilterTaskEnum.SHOW_ACTIVE:
      return state?.filter(task => !task.completed);
    case FilterTaskEnum.SHOW_COMPLETED:
      return state?.filter(task => task.completed);
    default:
      return state;
  }
};

export default FilterTaskReducer;
