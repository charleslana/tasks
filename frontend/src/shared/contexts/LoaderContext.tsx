import ILoaderContext from '../models/ILoaderContext';
import IPropsContext from '../models/IPropsContext';
import IStateLoader from '../models/IStateLoader';
import loaderReducer from '../reducers/LoaderReducer';
import React, { createContext, useReducer } from 'react';

export const LoaderContext = createContext<ILoaderContext>({});

const LoaderContextProvider = (props: IPropsContext): JSX.Element => {
  const initialState: IStateLoader = {
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
