import ToastEnum from '../enumerations/ToastEnum';

export default interface ActionToastInterface {
  detail?: string;
  severity?: string;
  type: ToastEnum;
}
