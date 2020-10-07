import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Helps from '../1posterHelps/Helps';
import AcceptedHelps from '../2AccepterHelps/AcceptedHelps';
import ActiveStorageProvider from 'react-activestorage-provider'; 

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      helps: {},
      acceptedHelps: {},
    };      
    
  };
  
  componentWillMount() {
    axios.get(`http://localhost:3000/users/${localStorage.userId}`)
    .then(response => {
      console.log(response.data)
    })
  }
  // componentDidUpdate() {
  //   componentDidMount(){
  //   console.log(this.props.user.id);
  // }
  
  render() {
    return (
      <div>
        {/* <h1>Dashboard</h1>
        <h1>Status: {this.props.isLoggedin.toString()}</h1> */}
        <img src={`http://localhost:3000/users/${localStorage.userId}`} />
        <h1>User: {this.props.user.email}</h1>
        <Helps {...this.props.user}/>
        <AcceptedHelps {...this.props.user}/>
      </div>
    );
  };
};

export default Dashboard;