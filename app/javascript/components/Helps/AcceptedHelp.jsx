import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Conversation from '../Conversation';

class AcceptedHelp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      acceptedHelp: [],
      loaded: false,
    };
    
  }

  componentDidMount() {
    // console.log(this.state.id)
    axios.get(`http://localhost:3000/accepted_help/${this.state.id}`)
    .then ( resp => {
      // console.log(resp.data.data)
      // console.log(resp.data.data.attributes.help)
      this.setState({acceptedHelp: resp.data.data, loaded: true})
      // console.log(this.state.acceptedHelp)
    })
    .catch ( resp => console.log(resp) )
  }

  render() {
    let loaded = this.state.loaded;
    return (
      <div>
        {
          loaded &&
          <Fragment>
            <div key ={this.state.acceptedHelp.attributes.id}>
              <h1>AcceptedHelp</h1>
              {/* {console.log(this.state.acceptedHelp)} */}
              <h1>Title: {this.state.acceptedHelp.attributes.help.title}</h1>
              <h3>Type of Request: {this.state.acceptedHelp.attributes.help.request_type}</h3>
              <p>Description: {this.state.acceptedHelp.attributes.help.description}</p>
            </div>
            {/* // need to pass in the props of the acceptedHelp ID */}
            <Conversation acceptedHelp={this.state.acceptedHelp} user={this.props.user} cableApp = {this.props.cableApp}/>
          </Fragment>
        }
      </div>
    )
  };

};

export default AcceptedHelp;