import IActionTask from '../models/IActionTask';
import IStateTask from '../models/IStateTask';
import TaskEnum from '../enumerations/TaskEnum';

const taskReducer = (
  state: IStateTask[],
  action: IActionTask
): IStateTask[] => {
  switch (action.type) {
    case TaskEnum.ADD_TASK: {
      if (action.task) {
        return [...state, action.task];
      }
      return state;
    }
    case TaskEnum.CHECK_TASK: {
      if (action.task) {
        const taskIndex = state.findIndex(
          (task: IStateTask) => task.id === action.task?.id
        );
        state[taskIndex].completed = action.task.completed;
      }
      return state.filter((task: IStateTask) => task.id !== action.id);
    }
    case TaskEnum.REMOVE_ALL_TASK:
      return (state = []);
    case TaskEnum.REMOVE_TASK:
      return state.filter((task: IStateTask) => task.id !== action.id);
    case TaskEnum.UPDATE_TASK:
      return state.map(task =>
        task.id === action.task?.id
          ? { ...task, description: action.task?.description }
          : task
      );
    default:
      return state;
  }
};

export default taskReducer;
