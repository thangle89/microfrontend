import React from 'react';
import { connect } from 'react-redux';
import { shipmentActions } from 'store/Shipment';
import { ApplicationState } from 'store';
import styled from 'styled-components';

interface DispatchProps {
  getInitialState: typeof shipmentActions.getInitialState;
}

interface StateProps {
  totalShipment: number;
}

type Props = StateProps & DispatchProps;

const Container = styled.div`
    margin: 0 auto;
    max-width: 1024px;
`

class Layout extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.getInitialState();
  }
  render() {
    return (
      <Container>
        <h1> Users Management</h1>
        {this.props.children}
      </Container>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  totalShipment: state.shipmentIds.length
});

const mapDispatchToProps = (dispatch: Function) => ({
  getInitialState: () => dispatch(shipmentActions.getInitialState())
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
