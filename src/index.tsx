declare global {
  namespace NodeJS {
    interface Global {
      expect: any;
      describe: any;
      it: any;
    }
  }
}

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from 'Routes';
import configureStore from 'store/configureStore';
import { combineReducers } from 'redux';
import { reducer as commonReducer, ApplicationState, selectorsReducer } from './store/index';
import { DynamicModule } from 'core/manifest';
import { coreActions } from 'core/store';

export const browserHistory = createBrowserHistory();
const reducers = combineReducers({ common: commonReducer, selectors: selectorsReducer});
export const { store } = configureStore(undefined, reducers);
store['dynamicReducers'] = { common: commonReducer, selectors: selectorsReducer};

export const registerModuleToMainApp = (module: DynamicModule) => {
  const newReducers = combineReducers<ApplicationState>({
    ...store['dynamicReducers'],
    [module.moduleKey]: module.reducer,
  });
  store.replaceReducer(newReducers);
  store['dynamicReducers'] = { ...store['dynamicReducers'], [module.moduleKey]: module.reducer };
  store.dispatch(coreActions.updateSelectors(module.selectors));
}

export const getModuleState = (moduleStateKey: string, moduleKey:string, state: ApplicationState) => {
  if (state.selectors[moduleStateKey] && state[moduleKey]) { 
    return state.selectors[moduleStateKey](state[moduleKey]); 
  }
  return null;
}

globalThis.React = React; // export dependencies for modules

// Render function containing the HMR AppContainer
const renderApp = () => {
  render(
    <AppContainer>
            <Provider store={store}>
                    <Router history={browserHistory}>
                        <Routes />
                    </Router>
            </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

async function init() {
  renderApp();
}

init();

