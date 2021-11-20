import ActionEnum from '../enumerations/ActionEnum';
import ActionTaskInterface from '../interfaces/ActionTaskInterface';
import StateTaskInterface from '../interfaces/StateTaskInterface';

const taskReducer = (
  state: StateTaskInterface[],
  action: ActionTaskInterface
): StateTaskInterface[] => {
  switch (action.type) {
    case ActionEnum.ADD_TASK: {
      if (action.task) {
        return [...state, action.task];
      }
      return state;
    }
    case ActionEnum.CHECK_TASK: {
      if (action.task) {
        const taskIndex = state.findIndex(
          (task: StateTaskInterface) => task.id === action.task?.id
        );
        state[taskIndex].completed = action.task.completed;
      }
      return state.filter((task: StateTaskInterface) => task.id !== action.id);
    }
    case ActionEnum.REMOVE_TASK:
      return state.filter((task: StateTaskInterface) => task.id !== action.id);
    case ActionEnum.UPDATE_TASK:
      return state.map(task =>
        task.id === action.task?.id
          ? { ...task, description: action.task?.description }
          : task
      );
    case ActionEnum.REMOVE_ALL_TASK:
      return (state = []);
    default:
      return state;
  }
};

export default taskReducer;
