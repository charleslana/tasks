import ActionToastInterface from './ActionToastInterface';
import StateToastInterface from './StateToastInterface';
import { Dispatch } from 'react';

export default interface ToastContextInterface {
  dispatch?: Dispatch<ActionToastInterface>;
  state?: StateToastInterface;
}
