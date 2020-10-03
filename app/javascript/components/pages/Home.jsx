import React from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../auth/SignUp';
import Login from '../auth/Login';
import axios from 'axios';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    // this.handleLogOutClick = this.handleLogOutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    // this.props.history.push("/dashboard");
  };

  // handleLogOutClick() {
  //   axios.delete("http://localhost:3000/logout", { withCredentials: true})
  //   .then(response => {
  //     this.props.handleLogOut();
  //     this.props.history.push('/')
  //   })
  //   .catch(error => {
  //     console.log("logout error", error);
  //   });
  // };

  render() {
    return (
    <div className = "container">
      {/* {
        this.props.isLoggedin ? 
        <button onClick={() => this.handleLogOutClick()}>Logout</button> :
        null
      } */}

      <div className ="row">
        <div className ="col-md-5 text-center" style={{backgroundColor: "lightblue"}}>
          <p className ="pt-4">
            We are connecting people and buidling a community in a time of need and 
            also in the time of goodness. Whether you want to provide generous help or 
            recieve help in time of difficulties....
          </p>
        </div>
        <div className ="col-md-5 text-center pt-4">
          <h5>Get involve now!</h5>
          <SignUp handleSuccessfulAuth={this.handleSuccessfulAuth} />
        </div>
      </div>

      <div className ="">
        <h3 className ="">Quick Guide</h3>
        <p>
          Sign up with an email address, password and a copy of government-approved ID (.jpg, .pgn, .pdf)
        </p>
        <p>
          Broswer the map for those who are requesting help.
        </p>
        <p>
          Need help yourself? Make your own request.
        </p>
      </div>

      <div className ="row mb-3">
        <div className ="col-md-6 offset-md-3">
          <Login handleSuccessfulAuth = {this.handleSuccessfulAuth}/>
        </div>
      </div>

      <div className ="">
        <h3 className ="">Contact Us</h3>
        <p>

        </p>
      </div>

    </div>
    );
  };
};

export default Home;