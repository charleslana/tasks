import LoaderEnum from '../enumerations/LoaderEnum';
import { LoaderContext } from '../contexts/LoaderContext';
import { useContext } from 'react';

export const loaderService = (): {
  loading: boolean | undefined;
  showLoading: () => void | undefined;
  hideLoading: () => void | undefined;
} => {
  const { state, dispatch } = useContext(LoaderContext);
  const hideLoading = () =>
    dispatch?.({
      type: LoaderEnum.HIDE_LOADER,
    });
  const showLoading = () =>
    dispatch?.({
      type: LoaderEnum.SHOW_LOADER,
    });
  return { loading: state?.loading, showLoading, hideLoading };
};
