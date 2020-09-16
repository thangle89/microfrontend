
interface DynamicRoutes {
    path: string;
    component: React.ComponentType<{}>;
}
export interface DynamicModule {
    getRoutes: () => DynamicRoutes[]
    reducer: Function;
    selectors: {[key: string]: Function};
    moduleKey: string;
}