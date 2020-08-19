import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { BroswerRouter as Router, Link } from 'react-router-dom';

const AcceptedHelps = () => {
  const [acceptedHelps, setacceptedHelps] = useState([])

  useEffect(() => {
    //get all helps from api
    //update helps in our state
    axios.get(`http://localhost:3000/myAccepted.json`)
    .then( resp => {
      // console.log(resp.data.data)
      setacceptedHelps(resp.data.data)
    })
    .catch( resp => console.log(resp) )
  }, [setacceptedHelps.length])

  const list = acceptedHelps.map( item => {
    // console.log(item.attributes)
    // console.log(item.attributes.help)
    return (
      <div key ={item.id}>
        {/* <h4>
          User of Help: {item.attributes.help.user_id}
        </h4> */}
        {/* <h4>
          User of AcceptedHelp: {item.attributes.user.email}
        </h4> */}
        <h4>
          Title: {item.attributes.help.title}
        </h4>  
        <Link to = {`/acceptedhelp/${item.id}`}>
          View and chat
        </Link>    
      </div>
    )
  })

  return (
    <div className ="home">
      <div className ="header">
        <h1>AcceptedHelps</h1>
      </div>
      <div className ="grid">
        {list}
        {/* <ul>{list}</ul> */}
      </div>
    </div>
  )
}

export default AcceptedHelps; 