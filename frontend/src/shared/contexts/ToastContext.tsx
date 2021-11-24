import PropsContextInterface from '../interfaces/PropsContextInterface';
import React, { createContext, useReducer } from 'react';
import StateToastInterface from '../interfaces/StateToastInterface';
import ToastContextInterface from '../interfaces/ToastContextInterface';
import toastReducer from '../reducers/ToastReducer';

export const ToastContext = createContext<ToastContextInterface>({});

const ToastContextProvider = (props: PropsContextInterface): JSX.Element => {
  const initialState: StateToastInterface = {
    toast: false,
  };
  const [state, dispatch] = useReducer(toastReducer, initialState);
  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
