import ActionLoaderInterface from '../interfaces/ActionLoaderInterface';
import LoaderEnum from '../enumerations/LoaderEnum';
import StateLoaderInterface from '../interfaces/StateLoaderInterface';

const loaderReducer = (
  state: StateLoaderInterface,
  action: ActionLoaderInterface
): StateLoaderInterface => {
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
