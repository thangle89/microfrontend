# Micro Frontend boostrap

### Description

This is basic structure for micro frontend app using React, Redux and React Router. The app contains single React instance for different modules.

### Structure
The structure of the application as follow:

 ![MicroFrontdent](./docs/MicroFrontend.PNG)
 <center>App structure</center>

Main app contains common information and layout. After render, it will load a module base on static url address.
Inside the module has a main entry which has list of routes, its components and root reducer of the module. All components are lazy loaded from the entry.
Module can access and update its own store and the store that are defined in common.

### How to run

1. `Yarn start` in root folder
2. `Yarn start` in `modules/`

### Project setup

#### a. Main app
Compose of root component in React router
```js
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
```
It also `export` function to dynamically `replace` redux reducer for main app.

```js
export const updateStoreReducer = (storeReducer) => {
  const newReducers = combineReducers<ApplicationState>({
    core: coreReducer,
    ...storeReducer
  })
  store.replaceReducer(newReducers);
}
```

In `Routes` component, it renders the layout of main application, then `lazy` load other routes

```js
declare global {
  interface Window { __MyModule: { default: DynamicModule } }
}

interface State {
  routes: DynamicRoute[];
}


class Routes extends React.PureComponent<Props, State> {
  constructor(props){
    super(props);
    this.state = {
      routes: []
    };
  }
  componentDidMount() {
    const dynamicModuleUrl = 'http://localhost:9000/myModule.js';
    import(/* webpackIgnore: true */ dynamicModuleUrl).then(_ => {
      this.setState({routes: window.__MyModule.default.getRoutes()})
      updateStoreReducer({ module: window.__MyModule.default.reducer });
    });
  }
  render() {
    return (
      <Layout>
        <Switch location={this.props.history.location}>
          <Route path='/' component={Home} exact={true} />
          <Route path='/about' component={About} exact={true} />
          {this.state.routes.map(r => <Route key={r.path} path={r.path} component={r.component} exact={true} />)}
          <Redirect to='/' />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(Routes);
```

In order to plug the module into main application, the module has to export the routes, their components and the module's root reducer.

#### b. Module
The entry point of the module has the structure as 

```js
const LazyMainComponent = React.lazy(() =>  import('./Main'));

const module: DynamicModule = {
    getRoutes: () => [
        { path: '/myModule', component: getLazyComponent(LazyMainComponent) }
    ],
    reducer: reducer,
}

export default module;
```

It exports all the routes that contains the lazy loaded components and a reducer. The entry has these lazy components to ensure that main app doesn't need to load all the unnecessary javascript files on the first landing. Instead, every components in module will be loaded only when in need. 

Module' components can access to common and other's module store as much as you want. But to increase the indepence between modules, it's recommended that module components only access to common store.

If you need to access shared models between modules, it'd better to have these shared models as an input of modules. 

#### c. Webpack

In main app

```js
...
entry: {
    app: "./src/index.tsx",
  },
...
externals: {
    react: 'React'
  }
```

In module

```js
...
output: {
    pathinfo: false,
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    publicPath: "http://localhost:9000/",
    library: '__MyModule',
    libraryTarget: 'umd'
  },
...
entry: {
    myModule: './index.tsx',
  },
externals: {
    react: 'React'
  },
```

Both main app and module's webpack expect that `React` will be an external dependency. In order to include React in app, the temporal solution is to put it inside `<head>` document as in this example.