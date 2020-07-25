import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Help from './Help';

const Helps = () => {
  const [helps, setHelps] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/helps1')
    .then( resp => {
      console.log(resp.data.data)
      setHelps(resp.data.data)
    })
    .catch( resp => console.log(resp) )
  }, [helps.length])

    // iterate and pass in data for the Airline component
    const grid = helps.map( item => {
      return (
        <Help 
          key ={item.id}
          attributes ={item.attributes}
        />
      )
    })

  return (
    <Fragment>
      <div>{grid}</div>
    </Fragment>
  )
}

export default Helps;