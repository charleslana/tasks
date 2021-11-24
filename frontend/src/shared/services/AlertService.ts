import AlertEnum from '../enumerations/AlertEnum';
import { AlertContext } from '../contexts/AlertContext';
import { useContext } from 'react';

export const alertService = (): {
  alert: boolean | undefined;
  showAlert: (message: string) => void | undefined;
  hideAlert: () => void | undefined;
  message: string | undefined;
} => {
  const { state, dispatch } = useContext(AlertContext);
  const hideAlert = () =>
    dispatch?.({
      type: AlertEnum.HIDE_ALERT,
    });
  const showAlert = (message: string) =>
    dispatch?.({
      message: message,
      type: AlertEnum.SHOW_ALERT,
    });
  return {
    alert: state?.alert,
    showAlert,
    hideAlert,
    message: state?.message,
  };
};
