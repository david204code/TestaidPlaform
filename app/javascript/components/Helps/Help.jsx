import React, { useState, useEffect, Fragment } from 'react';
import { BroswerRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';
import Message from '../Message';

const Help = (props) => {
  const [help, setHelp] = useState({})
  // get everything to load
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const id = props.match.params.id
    // console.log(id);
    
    axios.get(`http://localhost:3000/help/${id}`)
    .then ( resp => {
      // console.log(resp.data.data)
      // console.log(resp.data.data.attributes)
      setHelp(resp.data.data)
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
          <div>Title: {help.attributes.title}</div>
          <div>Description: {help.attributes.description}</div>
          <div>Request type: {help.attributes.request_type}</div>
          <div>User: {help.attributes.user.id}</div> 
          <Message />
        </div>
      }
    </Fragment>
  )
}

export default Help;