import ActionAlertInterface from '../interfaces/ActionAlertInterface';
import AlertEnum from '../enumerations/AlertEnum';
import StateAlertInterface from '../interfaces/StateAlertInterface';

const alertReducer = (
  state: StateAlertInterface,
  action: ActionAlertInterface
): StateAlertInterface => {
  switch (action.type) {
    case AlertEnum.HIDE_ALERT:
      return {
        alert: false,
      };
    case AlertEnum.SHOW_ALERT:
      return {
        alert: true,
        message: action.message,
      };
    default:
      return state;
  }
};

export default alertReducer;
