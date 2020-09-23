import React from 'react';
import { reducer, selectModuleState } from './store';
import { DynamicModule } from './core/manifest';
import { getLazyComponent } from './LazyComponent';

const LazyMainComponent = React.lazy(() =>  import('./Main'));

const module: DynamicModule = {
    routes: [
        { path: '/myModule', component: getLazyComponent(LazyMainComponent) }
    ],
    reducer: reducer,
    selectors: {'module.getStatus': selectModuleState},
    moduleKey: 'module',
}

export default module;
