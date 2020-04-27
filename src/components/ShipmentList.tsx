import React from 'react';
import { ApplicationState } from 'store';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ShipmentItem from './ShipmentItem';

interface StateProps {
  shipmentIds: string[];
}

const Row = styled.div`
  display: flex;
  div {
    flex: 1;
    border: 1px solid;
  }
`;

class ShipmentList extends React.PureComponent<StateProps> {
  render() {
    const shipments = this.props.shipmentIds.map(id => (
      <Row key={id}>
        <ShipmentItem shipmentId={id} />
      </Row>
    ));
    return (
      <>
        <Row>
          <div>
            <strong>ID</strong>
          </div>
          <div>
            <strong>Name</strong>
          </div>
          <div>
            <strong>Total</strong>
          </div>
          <div>
            <strong>Status</strong>
          </div>
          <div>
            <strong>Action</strong>
          </div>
        </Row>
        {shipments}
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  shipmentIds: state.shipmentIds
});

export default connect(mapStateToProps)(ShipmentList);
