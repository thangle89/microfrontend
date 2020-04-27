import React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Shipment, ApplicationState } from 'store';
import { connect } from 'react-redux';
import { shipmentActions } from 'store/Shipment';

interface DetailsParams {
    id: string;
}

type OwnProps = RouteComponentProps<DetailsParams>;

interface StateProps {
    shipment: Shipment;
}

interface OwnState {
    shipmentName: string;
}

interface DispatchProps {
    updateName: (id: string, name: string) => {};
}

type Props = OwnProps & StateProps & DispatchProps;

const mapStateToProps = (state: ApplicationState, props: OwnProps) => ({
    shipment: state.shipments[props.match.params.id]
});

const mapDispatchToProps = (dispatch: Function) => ({
    updateName: (id: string, name: string) => dispatch(shipmentActions.updateName({id, name} as Shipment)),
});

export class ShipmentDetails extends React.PureComponent<Props, OwnState> {
    constructor(props) {
        super(props);
        this.state = {
            shipmentName: '',
        };
    }

    handleChange = (event: any) => {
        this.setState({
            shipmentName: event.target.value,
        })
    }

    handleClick = () => {
        this.props.updateName(this.props.shipment.id, this.state.shipmentName);
        this.setState({
            shipmentName: ''
        });
    }

    render() {
        const { shipment } = this.props;
        if (!shipment) return null;
        return (
            <div>
                <h3>Shipment Details</h3>
                <div>
                    <NavLink to='/'>Back</NavLink>
                </div>
                <div>
                    Summary;
            <div>
                        <span><strong>ID: </strong></span>
                        <span>{shipment.id}</span>
                    </div>
                    <div>
                        <span><strong>Name: </strong></span>
                        <span>{shipment.name}</span>
                        <div>
                            <span><input type="text" value={this.state.shipmentName} onChange={this.handleChange} /></span>
                            <span><button onClick={this.handleClick}>Update</button></span>
                        </div>
                    </div>
                    <div>
                        <span><strong>Mode: </strong></span>
                        <span>{shipment.mode}</span>
                    </div>
                    <div>
                        <span><strong>Type: </strong></span>
                        <span>{shipment.type}</span>
                    </div>
                    <div>
                        <span><strong>Origin: </strong></span>
                        <span>{shipment.origin}</span>
                    </div>
                    <div>
                        <span><strong>Destination: </strong></span>
                        <span>{shipment.destination}</span>
                    </div>
                    <div>
                        <span><strong>Total: </strong></span>
                        <span>{shipment.total}</span>
                    </div>
                    <div>
                        <span><strong>Status: </strong></span>
                        <span>{shipment.status}</span>
                    </div>
                    <div>
                        <span><strong>UserId: </strong></span>
                        <span>{shipment.userId}</span>
                    </div>
                    <div>
                        <span><strong>Services: </strong></span>
                        <span>{shipment.services.map(ser => ser.type).join(', ')}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentDetails);
