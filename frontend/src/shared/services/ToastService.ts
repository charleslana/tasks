import ToastEnum from '../enumerations/ToastEnum';
import { ToastContext } from '../contexts/ToastContext';
import { useContext } from 'react';

export const toastService = (): {
  toast: boolean | undefined;
  showToast: (severity: string, detail: string) => void | undefined;
  hideToast: () => void | undefined;
  severity: string | undefined;
  detail: string | undefined;
} => {
  const { state, dispatch } = useContext(ToastContext);
  const hideToast = () =>
    dispatch?.({
      type: ToastEnum.HIDE_TOAST,
    });
  const showToast = (severity: string, detail: string) =>
    dispatch?.({
      severity: severity,
      detail: detail,
      type: ToastEnum.SHOW_TOAST,
    });
  return {
    toast: state?.toast,
    showToast,
    hideToast,
    severity: state?.severity,
    detail: state?.detail,
  };
};
