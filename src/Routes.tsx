import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { History } from 'history';
import Layout from 'layout/Layout';
import Home from 'components/Home';
import About from 'components/About';

interface DynamicRoute {
  path: string;
  component: React.ComponentType<any>;
}

interface Props {
  history: History;
  location: any;
  match: any;
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
    const dynamicModuleUrl = 'http://localhost:9000/myModule.js'; //'./myModule.35637e7f9e6020da3172.js'; //static
    console.log('loading module');
    import(/* webpackIgnore: true */ dynamicModuleUrl).then(module => {
      console.table(module);
      this.setState({routes: window['routes']})
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
