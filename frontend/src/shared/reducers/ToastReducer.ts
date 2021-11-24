import ActionToastInterface from '../interfaces/ActionToastInterface';
import StateToastInterface from '../interfaces/StateToastInterface';
import ToastEnum from '../enumerations/ToastEnum';

const toastReducer = (
  state: StateToastInterface,
  action: ActionToastInterface
): StateToastInterface => {
  switch (action.type) {
    case ToastEnum.HIDE_TOAST:
      return {
        toast: false,
      };
    case ToastEnum.SHOW_TOAST:
      return {
        toast: true,
        severity: action.severity,
        detail: action.detail,
      };
    default:
      return state;
  }
};

export default toastReducer;
