import {
  StoreEnhancer,
  compose,
  applyMiddleware,
  createStore,
  Store
} from 'redux';
import reduxThunk from 'redux-thunk';
import { ApplicationState } from 'store';
import { reducer } from './Shipment';

export default function configureStore(initialState?: ApplicationState) {
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

  const store = createStoreWithMiddleware(reducer, initialState) as Store<
    ApplicationState
  >;

  return { store };
}
