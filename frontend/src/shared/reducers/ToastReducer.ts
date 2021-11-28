import IActionToast from '../models/IActionToast';
import IStateToast from '../models/IStateToast';
import ToastEnum from '../enumerations/ToastEnum';

const toastReducer = (
  state: IStateToast,
  action: IActionToast
): IStateToast => {
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
