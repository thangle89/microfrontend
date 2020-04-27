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

const Header = styled.header`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
`

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
`;

const Link = styled.a`
  width: 120px;
`;

class Layout extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.getInitialState();
  }
  render() {
    return (
      <Container>
        <Header> 
          <div>
            <div><h1>Simple crafts</h1></div>
          </div>
          <Nav>
            <Link>Posts</Link>
            <Link>About</Link>
          </Nav>
        </Header>
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
