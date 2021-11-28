import AlertEnum from '../enumerations/AlertEnum';

export default interface IActionAlert {
  message?: string;
  type: AlertEnum;
}
