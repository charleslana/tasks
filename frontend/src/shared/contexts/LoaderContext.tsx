import LoaderContextInterface from '../interfaces/LoaderContextInterface';
import loaderReducer from '../reducers/LoaderReducer';
import PropsContextInterface from '../interfaces/PropsContextInterface';
import React, { createContext, useReducer } from 'react';
import StateLoaderInterface from '../interfaces/StateLoaderInterface';

export const LoaderContext = createContext<LoaderContextInterface>({});

const LoaderContextProvider = (props: PropsContextInterface): JSX.Element => {
  const initialState: StateLoaderInterface = {
    loading: false,
  };
  const [state, dispatch] = useReducer(loaderReducer, initialState);
  return (
    <LoaderContext.Provider value={{ state, dispatch }}>
      {props.children}
    </LoaderContext.Provider>
  );
};

export default LoaderContextProvider;
