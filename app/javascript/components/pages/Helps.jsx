import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

const Helps = () => {
  const [helps, setHelps] = useState({})

  useEffect(() => {
    axios.get('http://localhost:3000/helps')
    .then( resp => {
      console.log(resp.data)
      setHelps(resp.data)
    })
    .catch( resp => console.log(resp) )
  }, [])

  return (
    <Fragment>
      <div>Hello</div>
    </Fragment>
  )
}

export default Helps;