import ActionTaskInterface from '../interfaces/ActionTaskInterface';
import StateTaskInterface from '../interfaces/StateTaskInterface';
import TaskEnum from '../enumerations/TaskEnum';

const taskReducer = (
  state: StateTaskInterface[],
  action: ActionTaskInterface
): StateTaskInterface[] => {
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
          (task: StateTaskInterface) => task.id === action.task?.id
        );
        state[taskIndex].completed = action.task.completed;
      }
      return state.filter((task: StateTaskInterface) => task.id !== action.id);
    }
    case TaskEnum.REMOVE_ALL_TASK:
      return (state = []);
    case TaskEnum.REMOVE_TASK:
      return state.filter((task: StateTaskInterface) => task.id !== action.id);
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
