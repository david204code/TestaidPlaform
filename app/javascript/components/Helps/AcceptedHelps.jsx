import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { BroswerRouter as Router, Link } from 'react-router-dom';

const AcceptedHelps = () => {
  const [acceptedHelps, setacceptedHelps] = useState([])

  useEffect(() => {
    //get all helps from api
    //update helps in our state
    axios.get('http://localhost:3000/accepted_helps1.json')
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
        <h1>
          User of Help: {item.attributes.help.user_id}
        </h1>
        <h1>
          User of AcceptedHelp: {item.attributes.user.email}
        </h1>
        <h1>
          Title: {item.attributes.help.title}
        </h1>  
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
        <div className ="subheader">AcceptedHelps App</div>
      </div>
      <div className ="grid">
        {list}
        {/* <ul>{list}</ul> */}
      </div>
    </div>
  )
}

export default AcceptedHelps; 