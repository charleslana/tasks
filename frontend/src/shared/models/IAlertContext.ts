import IActionAlert from './IActionAlert';
import IStateAlert from './IStateAlert';
import { Dispatch } from 'react';

export default interface IAlertContext {
  dispatch?: Dispatch<IActionAlert>;
  state?: IStateAlert;
}
