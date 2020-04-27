import React from 'react';
import { Shipment, ApplicationState } from 'store';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

interface OwnProps {
  shipmentId: string;
}

interface StateProps {
  shipment: Shipment;
}

type Props = OwnProps & StateProps;

const mapStateToProps = (state: ApplicationState, props: OwnProps) => ({
  shipment: state.shipments[props.shipmentId]
});

export const ShipmentItem: React.FC<Props> = props => {
  return (
    <>
      <div>{props.shipmentId}</div>
      <div>{props.shipment.name}</div>
      <div>{props.shipment.total}</div>
      <div>{props.shipment.status}</div>
      <div>
        <NavLink to={`/shipment/${props.shipmentId}`}>Details</NavLink>
      </div>
    </>
  );
};

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(ShipmentItem);
