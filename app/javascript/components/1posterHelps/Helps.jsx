import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { BroswerRouter as Router, Link } from 'react-router-dom';

// const Helps = () => {
//   const [helps, setHelps] = useState([])

//   useEffect(() => {
//     //get all helps from api
//     //update helps in our state
//     axios.get('http://localhost:3000/myHelp.json')
//     .then( resp => {
//       console.log(resp.data.data)
//       setHelps(resp.data.data)
//     })
//     .catch( resp => console.log(resp) )
//   }, [])

//   // const list = helps.map( item => {
//   //   // console.log(item)
//   //   return (
//   //     <div key ={item.id}>
//   //       <h1>
//   //         User of Help: {item.attributes.user.user_id}
//   //       </h1>
//   //       <h1>
//   //         User of AcceptedHelp: {item.attributes.user.email}
//   //       </h1>
//   //       <h1>
//   //         Title: {item.attributes.title}
//   //       </h1>  
//   //       <Link to = {`/myhelp/${item.id}`}>
//   //         View and chat
//   //       </Link>    
//   //     </div>
//   //   )
//   // })

//   return (
//     <div className ="home">
//       <div className ="header">
//         <h1>Helps</h1>
//         <div className ="subheader">Help App</div>
//       </div>
//       <div className ="grid">
//         {/* <ul>{list}</ul> */}
//       </div>
//     </div>
//   )
// }

class Helps extends React.Component {

  constructor(props) {
    super(props);

    this.state ={
      helps: [],
    };

  }

  componentDidMount = () => {
    axios.get(`http://localhost:3000/activeHelps.json`)
    .then( response => {
      // console.log(response.data)
      this.setState({
        helps: response.data,
      })
    })
  }

  displayHelp = (helps) => {
    // console.log(helps)
    return helps.data && helps.data.map(help => {
      // console.log(help)
      return (
        <div key ={help.id}>
          {/* <h1>
            User of Help: {help.attributes.user.id}
          </h1> */}
          <h4>
            Title: {help.attributes.title}
          </h4>  
          <Link to = {`/myhelp/${help.id}`}>
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
          <h1>State of Helps</h1>
          {this.displayHelp(this.state.helps)}
        </div>
      </Fragment>
    ) 
  }
}

export default Helps; 