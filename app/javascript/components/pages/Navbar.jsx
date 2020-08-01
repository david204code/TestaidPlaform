import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #efefef;
  background: #fff;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  // padding: 20px;
`

const MenuOption = styled.div`
  padding: 10px 0 10px 0;
  font-size: 20px;
  font-weight: 600;
`

const LinkWrapper = styled.div`
  margin: 30px 0 20px 0;
  height: 50px;

  a {
    color: #964B00;
  }
`

class Navbar extends React.Component {

  constructor(props) {
    super(props);

    this.handleLogOutClick = this.handleLogOutClick.bind(this);
  }

  handleLogOutClick() {
    axios.delete("http://localhost:3000/logout", { withCredentials: true})
    .then(response => {
      this.props.handleLogOut();
      this.props.history.push('/')
    })
    .catch(error => {
      console.log("logout error", error);
    });
  };

  render() {
    return (
      <div className ="container">
        <h1 className ="text-center">Aid Platform</h1>
        <h4 className ="text-center">Help those around you, your very own local
          neighbour aid platform for your neighbour!
        </h4>
        {
          this.props.isLoggedin ? 
          <button onClick={() => this.handleLogOutClick()}>Logout</button> :
          null
        }
        <Card>
          <LinkWrapper>
            <Link to =""><MenuOption>Home</MenuOption></Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link to ="/map"><MenuOption>Map</MenuOption></Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link to ="/post"><MenuOption>Submit a post</MenuOption></Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link to ="/dashboard"><MenuOption>Dashboard</MenuOption></Link>
          </LinkWrapper>
        </Card>
      </div>
    );
  };
};

export default Navbar;