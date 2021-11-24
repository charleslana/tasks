import AlertEnum from '../enumerations/AlertEnum';

export default interface ActionAlertInterface {
  message?: string;
  type: AlertEnum;
}
