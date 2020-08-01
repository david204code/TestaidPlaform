import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { BroswerRouter as Router, Link } from 'react-router-dom';

const Helps = () => {
  const [helps, setHelps] = useState([])

  useEffect(() => {
    //get all helps from api
    //update helps in our state
    axios.get('http://localhost:3000/helps1.json')
    .then( resp => {
      // console.log(resp.data.data)
      setHelps(resp.data.data)
    })
    .catch( resp => console.log(resp) )
  }, [])

  const list = helps.map( item => {
    // console.log(item)
    return (
      <div key ={item.id}>
        <h1>
          User of Help: {item.attributes.user.user_id}
        </h1>
        <h1>
          User of AcceptedHelp: {item.attributes.user.email}
        </h1>
        <h1>
          Title: {item.attributes.title}
        </h1>  
        <Link to = {`/myhelp/${item.id}`}>
          View and chat
        </Link>    
      </div>
    )
  })

  return (
    <div className ="home">
      <div className ="header">
        <h1>Helps</h1>
        <div className ="subheader">Help App</div>
      </div>
      <div className ="grid">
        <ul>{list}</ul>
      </div>
    </div>
  )
}

export default Helps; 