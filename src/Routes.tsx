import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { History } from 'history';
import ShipmentList from 'components/ShipmentList';
import Layout from 'layout/Layout';
import ShipmentDetails from 'components/ShipmentDetails';

interface Props {
  history: History;
  location: any;
  match: any;
}

class Routes extends React.PureComponent<Props> {
  render() {
    return (
      <Layout>
        <Switch location={this.props.history.location}>
          <Route path='/' component={ShipmentList} exact={true} />
          <Route
            path='/shipment/:id'
            component={ShipmentDetails}
            exact={true}
          />
          <Redirect to='/' />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(Routes);
