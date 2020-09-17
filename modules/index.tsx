import React from 'react';
import { reducer, selectModuleState } from './store';
import { DynamicModule } from './core/manifest';
import { getLazyComponent } from './LazyComponent';

const LazyMainComponent = React.lazy(() =>  import('./Main'));

const module: DynamicModule = {
    getRoutes: () => [
        { path: '/myModule', component: getLazyComponent(LazyMainComponent) }
    ],
    reducer: reducer,
    selectors: {'module.status': selectModuleState},
    moduleKey: 'module',
}

export default module;
