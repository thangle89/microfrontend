import React from 'react';
import styled from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';
import { History } from 'history';


interface Props {
  history: History;
  location: any;
  match: any;
};

const Profile = styled.div`
  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const Container = styled.div`
    margin: 0 auto;
    max-width: 1024px;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  color: black;
  background: #fff;
  border-radius: 2px;
  align-items: center;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  width: 250px;
`;

const Link = styled(NavLink)`
  width: 100px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 14px;
  cursor: pointer;
  text-decoration: none;
  :hover, :active{
    color: black;
    background: #00FFFF;
  }
  
`;

const Head = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 24px;
  align-items: center;
  max-width: 720px;
  width: 75%;
`

const Title = styled.div`
  width: 50%;
`;


class Layout extends React.PureComponent<Props> {
  render() {
    const img = require('assets/profile.png');
    if(!this.props || !this.props.location || !this.props.location.pathname) {
      return null;
    }
    return (
      <>
        <Header>
          <Head>
            <Title><h2>Simple crafts</h2></Title>
            <Nav>
            <Link to="/">Posts</Link>
            <Link to="/about">About</Link>
          </Nav>
            <Profile><img src={img.default}/></Profile>
          </Head>
        </Header>
        <Container>
          {this.props.children}
        </Container>
      </>
    );
  }
}

export default withRouter(Layout);
