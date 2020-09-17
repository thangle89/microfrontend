import { Reducer, AnyAction } from 'redux';

export interface DynamicRoute {
    path: string;
    component: React.ComponentType<any>;
}
export interface DynamicModule {
    getRoutes: () => DynamicRoute[]
    reducer: Reducer<any, AnyAction>;
    selectors: {[key: string]: Function};
    moduleKey: string;
}