import AlertContextInterface from '../interfaces/AlertContextInterface';
import alertReducer from '../reducers/AlertReducer';
import PropsContextInterface from '../interfaces/PropsContextInterface';
import React, { createContext, useReducer } from 'react';
import StateAlertInterface from '../interfaces/StateAlertInterface';

export const AlertContext = createContext<AlertContextInterface>({});

const AlertContextProvider = (props: PropsContextInterface): JSX.Element => {
  const initialState: StateAlertInterface = {
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
