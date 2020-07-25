
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Help from './Help';

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
  }, [helps.length])

  const list = helps.map( item => {
    console.log(item)
    return (
      <Help 
        key ={item.id}
        attributes ={item.attributes}
        id ={item.id}
    />
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