import ActionEnum from '../enumerations/ActionEnum';
import ActionInterface from '../interfaces/ActionInterface';
import StateInterface from '../interfaces/StateInterface';

const taskReducer = (
  state: StateInterface[],
  action: ActionInterface
): StateInterface[] => {
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
          (task: StateInterface) => task.id === action.task?.id
        );
        state[taskIndex].completed = action.task.completed;
      }
      return state.filter((task: StateInterface) => task.id !== action.id);
    }
    case ActionEnum.REMOVE_TASK:
      return state.filter((task: StateInterface) => task.id !== action.id);
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
