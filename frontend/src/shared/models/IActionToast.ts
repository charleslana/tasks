import ToastEnum from '../enumerations/ToastEnum';

export default interface IActionToast {
  detail?: string;
  severity?: string;
  type: ToastEnum;
}
