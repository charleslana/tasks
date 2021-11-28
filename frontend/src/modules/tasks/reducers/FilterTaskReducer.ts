import FilterTaskEnum from '../enumerations/FilterTaskEnum';
import IStateTask from '../models/IStateTask';

const FilterTaskReducer = (
  state: IStateTask[],
  action: FilterTaskEnum
): IStateTask[] => {
  switch (action) {
    case FilterTaskEnum.SHOW_ACTIVE:
      return state?.filter(task => !task.completed);
    case FilterTaskEnum.SHOW_ALL:
      return state;
    case FilterTaskEnum.SHOW_COMPLETED:
      return state?.filter(task => task.completed);
    default:
      return state;
  }
};

export default FilterTaskReducer;
