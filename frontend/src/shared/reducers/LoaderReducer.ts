import IActionLoader from '../models/IActionLoader';
import IStateLoader from '../models/IStateLoader';
import LoaderEnum from '../enumerations/LoaderEnum';

const loaderReducer = (
  state: IStateLoader,
  action: IActionLoader
): IStateLoader => {
  switch (action.type) {
    case LoaderEnum.HIDE_LOADER:
      return {
        loading: false,
      };
    case LoaderEnum.SHOW_LOADER:
      return {
        loading: true,
      };
    default:
      return state;
  }
};

export default loaderReducer;
