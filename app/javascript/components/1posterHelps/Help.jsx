import React, { useState, useEffect, Fragment } from 'react';
import { BroswerRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';
import AcceptedHelps from './AcceptedHelps';

// const Help = (props) => {
//   const [help, setHelp] = useState({})
//   // get everything to load
//   const [loaded, setLoaded] = useState(false)

//   useEffect(() => {
//     const id = props.match.params.id
//     // console.log(id);
    
//     axios.get(`http://localhost:3000/helpChat/${id}`)
//     .then ( resp => {
//       // console.log(resp)
//       console.log(resp.data)
//       setHelp(resp.data)
//       setLoaded(true)
//     })
//     .catch ( resp => console.log(resp) )
//   }, [])

//   return (
//     <Fragment>
//       {
//         loaded && 
//         <div>
//           {/* {console.log(help)} */}
//           <div>Help ID: {help.id}</div>
//           <div>Title: {help.title}</div>
//           <div>Description: {help.description}</div>
//           <div>Request type: {help.request_type}</div>
//           <div>User: {help.user_id}</div> 
//           {/* <Messages /> */}
//         </div>
//       }
//     </Fragment>
//   )
// }

class Help extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      help: [],
      acceptedCount: '',
    };

  }

  componentDidMount = () => {
    this.getHelp()
  }

  getHelp = () => {
    const id = this.props.match.params.id
    // console.log(id);
    axios.get(`http://localhost:3000/helpChat/${id}`)
    .then(response => {
      // console.log(response)
      this.setState({
        help: response.data,
        acceptedCount: response.data.accepted_helps.length,
      })
    }) 
  }

  render() {
    return (
      <Fragment>
        <div>
          <h1>Help</h1>
           <p>Help ID: {this.state.help.id}</p>
           <p>Title: {this.state.help.title}</p>
           <p>Description: {this.state.help.description}</p>
           <p>Request type: {this.state.help.request_type}</p>
           <div>User: {this.state.help.user_id}</div> 
        </div>

        <div>
          <h4>Your request for help has been accepted: {this.state.acceptedCount} time(s)</h4>
          <AcceptedHelps 
            acceptedHelps = {this.state.help.accepted_helps} 
          />
        </div>
      </Fragment>
    )
  }
}

export default Help;