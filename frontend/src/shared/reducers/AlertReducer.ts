import AlertEnum from '../enumerations/AlertEnum';
import IActionAlert from '../models/IActionAlert';
import IStateAlert from '../models/IStateAlert';

const alertReducer = (
  state: IStateAlert,
  action: IActionAlert
): IStateAlert => {
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
