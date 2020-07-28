import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

const AcceptedHelp = (props) => {
  const [acceptedHelp, setacceptedHelp] = useState({})
  // ensure the state is set before accessing/using the data
  const [loaded, setLoaded] = useState(false)  

  useEffect(() => {

    const id = props.match.params.id
    // console.log(props)

    axios.get(`http://localhost:3000/accepted_help/${id}`)
    .then ( resp => {
      // console.log(resp.data.data)
      // console.log(resp.data.data.attributes.help)
      setacceptedHelp(resp.data)
      setLoaded(true)
    })
    .catch ( resp => console.log(resp) )
    // pass in an empty argument/array so it only runs once
  }, [])

  return (
    <div>
      {
        loaded &&
        <Fragment>
          <div key ={acceptedHelp.data.id}>
            <h1>AcceptedHelp</h1>
            {console.log(acceptedHelp.data)}
            <h1>Title: {acceptedHelp.data.attributes.help.title}</h1>
            <h3>Type of Request: {acceptedHelp.data.attributes.help.request_type}</h3>
            <p>Description: {acceptedHelp.data.attributes.help.description}</p>
          </div>
          <div>Message component</div>
        </Fragment>
      }
    </div>
  )
}

export default AcceptedHelp;