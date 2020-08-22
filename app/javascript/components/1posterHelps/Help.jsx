import React, { useState, useEffect, Fragment } from 'react';
import { BroswerRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';
import Messages from '../Messages';

const Help = (props) => {
  const [help, setHelp] = useState({})
  // get everything to load
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const id = props.match.params.id
    // console.log(id);
    
    axios.get(`http://localhost:3000/helpChat/${id}`)
    .then ( resp => {
      // console.log(resp)
      console.log(resp.data)
      setHelp(resp.data)
      setLoaded(true)
    })
    .catch ( resp => console.log(resp) )
  }, [])

  return (
    <Fragment>
      {
        loaded && 
        <div>
          {/* {console.log(help)} */}
          <div>Help ID: {help.id}</div>
          <div>Title: {help.title}</div>
          <div>Description: {help.description}</div>
          <div>Request type: {help.request_type}</div>
          <div>User: {help.user_id}</div> 
          {/* <Messages /> */}
        </div>
      }
    </Fragment>
  )
}

export default Help;