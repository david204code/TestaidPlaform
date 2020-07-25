import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AcceptedHelp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      acceptedHelp: {},
      userInfo: {},
      helpInfo: {},
    };

  };

  componentDidMount() {
    const {
      match: {
        params: { id, acceptedId }
      }
    } = this.props;

    // axios.get(`helps/45/accepted_help/59`)
    //might need to change accepted_helps to accepted_help
    axios.get(`/helps/${id}`)
    .then(response => {
      // console.log(response)
      // console.log(response.data)
      this.setState({helpInfo: response.data})
      // console.log(response.data)
    })
    .catch(error => console.log("Error", error))

    // axios.get(`helps/45/accepted_helps/59`)
    //might need to change accepted_helps to accepted_help
    axios.get(`/accepted_helps/${acceptedId}`)
    .then(response => {
        console.log(response.data)
        this.setState({acceptedHelp: response.data})
        // console.log(response.data)
    })
    .catch(error =>  console.log("error", error))
    
    // axios.get(`/helps/45/accepted_help/59/userInfo`)
    // axios.get(`/helps/${id}/accepted_help/${acceptedId}/userInfo`)
    axios.get(`/helps/${id}/user`)
    .then(response => {
      // console.log(response)
      this.setState({userInfo: response.data})
      // console.log(response.data)
    })
    .catch(error => console.log("Error", error))

  }

  render() {
    const { acceptedHelp } = this.state;
    const { helpInfo } = this.state;
    const { userInfo } = this.state;
    return (
      <div>
        <div>
          <h1>Hello from AcceptedHelp</h1>
          <p>You have accepted this request</p>
          <p>Please contact the member of your community by messaging them below:</p>
        </div>

        <h1>
          Accepted_Help ID: {acceptedHelp.id}
        </h1>

        <h1>
          Help ID: {helpInfo.id}
        </h1>
        <h1>
          Title: {helpInfo.title}
        </h1>
        <h1>
          Description: {helpInfo.description}
        </h1>
        <h1>
          Request type: {helpInfo.request_type}
        </h1>
        <h1>
          Contact: {userInfo.email}
        </h1>

        <div className ="text-center"> 
          <h1>Messaging {userInfo.email} here</h1>
          <div>
            <small>
              Box here
            </small>
          </div>
        </div>


      </div>
    )
  };

};

export default AcceptedHelp;