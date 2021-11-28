import IPropsContext from '../models/IPropsContext';
import IStateToast from '../models/IStateToast';
import IToastContext from '../models/IToastContext';
import React, { createContext, useReducer } from 'react';
import toastReducer from '../reducers/ToastReducer';

export const ToastContext = createContext<IToastContext>({});

const ToastContextProvider = (props: IPropsContext): JSX.Element => {
  const initialState: IStateToast = {
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
