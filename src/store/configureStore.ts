import {
  StoreEnhancer,
  compose,
  applyMiddleware,
  createStore,
  Store
} from 'redux';
import reduxThunk from 'redux-thunk';
import { ApplicationState } from 'store';

export default function configureStore(initialState: ApplicationState | undefined, storeReducers: any) {
  const windowIfDefined =
    typeof window === 'undefined' ? null : (window as any);

  const devToolsExtension =
    windowIfDefined &&
    (windowIfDefined.devToolsExtension as () => StoreEnhancer);
  const createStoreWithMiddleware = compose(
    applyMiddleware(reduxThunk),
    devToolsExtension ? devToolsExtension() : f => f
  )(createStore) as (
    reducers: any,
    initialState: any
  ) => Store<ApplicationState>;

  // const reducers = combineReducers({ core: coreReducer });
  const store = createStoreWithMiddleware(storeReducers, initialState) as Store<
    ApplicationState
  >;

  return { store };
}
