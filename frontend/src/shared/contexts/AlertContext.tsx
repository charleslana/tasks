import alertReducer from '../reducers/AlertReducer';
import IAlertContext from '../models/IAlertContext';
import IPropsContext from '../models/IPropsContext';
import IStateAlert from '../models/IStateAlert';
import React, { createContext, useReducer } from 'react';

export const AlertContext = createContext<IAlertContext>({});

const AlertContextProvider = (props: IPropsContext): JSX.Element => {
  const initialState: IStateAlert = {
    alert: false,
  };
  const [state, dispatch] = useReducer(alertReducer, initialState);
  return (
    <AlertContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
