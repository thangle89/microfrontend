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
import { reducer as coreReducer, ApplicationState } from './store/index';

export const browserHistory = createBrowserHistory();
const reducers = combineReducers({ core: coreReducer });
export const { store } = configureStore(undefined, reducers);

export const updateStoreReducer = (storeReducer) => {
  const newReducers = combineReducers<ApplicationState>({
    core: coreReducer,
    ...storeReducer
  })
  store.replaceReducer(newReducers);
}

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

