import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Counter from '../Counter';
import './Navbar.css';

// const Card = styled.div`
//   border: 1px solid #efefef;
//   background: #fff;
//   text-align: center;
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   grid-gap: 20px;
//   width: 100%;
//   // padding: 20px;
// `

// const MenuOption = styled.div`
//   padding: 10px 0 10px 0;
//   font-size: 20px;
//   font-weight: 600;
// `

// const LinkWrapper = styled.div`
//   margin: 30px 0 20px 0;
//   height: 50px;

//   a {
//     color: #964B00;
//   }
// `

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
      // <div className ="container vw-100 primary-color d-flex align-items-center justify-content-center">
      //   <div className ="jumbotron jumbotron-fluid bg-transparent pb-0">
      //     <Link
      //       to="/"
      //       className="btn btn-lg custom-button"
      //       role="button"
      //     >
      //       Welcome
      //     </Link>
      //     <Link
      //       to="/home"
      //       className="btn btn-lg custom-button"
      //       role="button"
      //     >
      //       Get Involved now
      //     </Link>
      //   </div>
      //   {/* <h1 className ="text-center">Aid Platform</h1>
      //   <h4 className ="text-center">Help those around you, your very own local
      //     neighbour aid platform for your neighbour!
      //   </h4> */}
      //   {
      //     this.props.isLoggedin ? 
      //     <button onClick={() => this.handleLogOutClick()}>Logout</button> :
      //     null
      //   }
      //   {
      //     this.props.isLoggedin ? 
      //     <p className ="text-center">CurrentUser: {this.props.userEmail}</p> :
      //     null
      //   }
      //   {
      //     this.props.isLoggedin ?
      //     <Fragment>
      //       <Card>
      //         <LinkWrapper>
      //           <Link to =""><MenuOption>Home</MenuOption></Link>
      //         </LinkWrapper>
      //         <LinkWrapper>
      //           <Link to ="/map"><MenuOption>Map</MenuOption></Link>
      //         </LinkWrapper>
      //         <LinkWrapper>
      //           <Link to ="/post"><MenuOption>Submit a post</MenuOption></Link>
      //         </LinkWrapper>
      //         <LinkWrapper>
      //           <Link to ="/dashboard"><MenuOption>Dashboard</MenuOption></Link>
      //         </LinkWrapper>
      //       </Card>
      //       <Counter />
      //     </Fragment>:
      //     null
      //   }
      // </div>

      
    <div className="text-center navBody">
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="masthead mb-auto">
          <div className="inner">
            <h3 className="masthead-brand">Aid Platform</h3>
              <nav className="nav nav-masthead justify-content-center">
                <Link
                  to="/"
                  className="nav-link active"
                  role="button"
                >
                  Home
                </Link>
                <Link 
                  to="/home"
                  className="nav-link active"
                  role="button"
                >
                  Get Involved now
                </Link>
                {
                  this.props.isLoggedin ?
                  <Fragment>
                    {/* <Link to ="">Home</Link> */}
                    <Link 
                      to ="/map"
                      className="nav-link active"
                      role="button"  
                    >
                      Map
                    </Link>
                    <Link 
                      to ="/post"
                      className="nav-link active"
                      role="button"
                    >
                      Submit a post
                    </Link>
                    <Link 
                      to ="/dashboard"
                      className="nav-link active"
                      role="button"  
                    >
                      Dashboard
                    </Link>
                    <Counter />
                  </Fragment>:
                  null
                }
                {
                  this.props.isLoggedin ? 
                    <button onClick={() => this.handleLogOutClick()}>Logout</button> :
                  null
                }
            </nav>
          </div>
        </header>

        {/* <main role="main" className="inner cover">
          <h1 className="cover-heading">Aid Platform</h1>
          <p className="lead">We are connecting people and buidling a community in a time of need and also in the time of goodness. Whether you want to provide generous help or recieve help in time of difficulties....</p>
          <p className="lead">
          <a href="#" className="btn btn-lg btn-secondary">Learn more</a>
          </p>
        </main>

        <footer className="mastfoot mt-auto">
          <div className="inner">
            <p>Cover template for <a href="https://getbootstrap.com/">Bootstrap</a>, by <a href="https://twitter.com/mdo">@mdo</a>.</p>
          </div>
        </footer> */}
      </div>
    </div>
    );
  };
};

export default Navbar;