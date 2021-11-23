import React, { createContext, useReducer } from 'react';
import LoaderContextInterface from '../interfaces/LoaderContextInterface';
import PropsContextInterface from '../interfaces/PropsContextInterface';
import StateLoaderInterface from '../interfaces/StateLoaderInterface';
import loaderReducer from '../reducers/LoaderReducer';

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
