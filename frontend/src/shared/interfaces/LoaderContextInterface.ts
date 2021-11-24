import ActionLoaderInterface from './ActionLoaderInterface';
import StateLoaderInterface from './StateLoaderInterface';
import { Dispatch } from 'react';

export default interface LoaderContextInterface {
  dispatch?: Dispatch<ActionLoaderInterface>;
  state?: StateLoaderInterface;
}
