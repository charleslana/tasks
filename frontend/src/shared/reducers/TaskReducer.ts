import ActionEnum from '../enumerations/ActionEnum';
import ActionInterface from '../interfaces/ActionInterface';
import StateInterface from '../interfaces/StateInterface';

const taskReducer = (state: StateInterface[], action: ActionInterface): any => {
  switch (action.type) {
    case ActionEnum.ADD_TASK: {
      return [...state, action.task];
    }
    case ActionEnum.CHECK_TASK: {
      const taskIndex = state.findIndex((t: any) => t.id === action.task.id);
      state[taskIndex].isChecked = action.task.isChecked;
      return state.filter((task: any) => task.id !== action.id);
    }
    case ActionEnum.REMOVE_TASK: {
      return state.filter((task: any) => task.id !== action.id);
    }
    default:
      return state;
  }
};

export default taskReducer;
