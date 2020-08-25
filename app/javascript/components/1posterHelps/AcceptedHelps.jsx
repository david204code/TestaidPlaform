import React, { Fragment } from 'react';
import axios from 'axios';
import { BroswerRouter as Router, Link } from 'react-router-dom';

class AcceptedHelps extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
    
  }

  // componentDidMount = () => {
  //   // this.getAcceptedHelp()
  //   // console.log(this.props.id);
  // }

  // getAcceptedHelp = () => {
  //   const id = this.props
  //   console.log(id)
  // }

  // mapAcceptedHelps() {
  //   console.log(this.props)
  // }

  displayAcceptedHelps = (acceptedHelps) => {
    // console.log(acceptedHelps)
    return acceptedHelps && acceptedHelps.map(acceptedHelp => {
      // console.log(acceptedHelp)
      return (
        <div key ={acceptedHelp.id}>
          <h1>
            Accepted User ID: {acceptedHelp.user_id}, AcceptedHelp ID: {acceptedHelp.id}
          </h1>
          <Link to = {`/acceptedhelp/${acceptedHelp.id}`}>
            View and chat
          </Link>  
        </div>
      )
    })
  }

  render() {
    return (
      <Fragment>
        <div>
          {/* <h4>Hello{this.mapAcceptedHelps()}</h4> */}
          {this.displayAcceptedHelps(this.props.acceptedHelps)}
        </div>
      </Fragment>
    )
  }
}

export default AcceptedHelps