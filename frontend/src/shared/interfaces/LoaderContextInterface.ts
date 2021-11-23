import ActionLoaderInterface from './ActionLoaderInterface';
import { Dispatch } from 'react';
import StateLoaderInterface from './StateLoaderInterface';

export default interface LoaderContextInterface {
  state?: StateLoaderInterface;
  dispatch?: Dispatch<ActionLoaderInterface>;
}
