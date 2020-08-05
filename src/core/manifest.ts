
export interface DynamicRoute {
    path: string;
    component: React.ComponentType<any>;
}
export interface DynamicModule {
    getRoutes: () => DynamicRoute[]
    reducer: Function;
}