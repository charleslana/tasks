import IActionToast from './IActionToast';
import IStateToast from './IStateToast';
import { Dispatch } from 'react';

export default interface IToastContext {
  dispatch?: Dispatch<IActionToast>;
  state?: IStateToast;
}
