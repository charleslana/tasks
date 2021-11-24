import ActionAlertInterface from './ActionAlertInterface';
import StateAlertInterface from './StateAlertInterface';
import { Dispatch } from 'react';

export default interface AlertContextInterface {
  dispatch?: Dispatch<ActionAlertInterface>;
  state?: StateAlertInterface;
}
