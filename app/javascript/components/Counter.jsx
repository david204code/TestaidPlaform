import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

// const Counter = () => {
//   const [counter, setCounter] = useState([])

//   useEffect(() =>{
//     axios.get(`http://localhost:3000/counter`)
//     .then( response => {
//       // console.log(response)
//       setCounter(response.data)
//     })
//     .catch(response => console.log(response))
//   }, [])

//   return(
//     <Fragment>
//       <div>
//          <h2>Number of unfilled request: {counter}</h2>
//       </div>
//     </Fragment>
//   )
// }

class Counter extends React.Component {
  
  constructor() {
    super()
    this.state = {
      count: ''
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/counter`)
    .then( response => {
      // console.log(response.data)
      this.setState({count: response.data})
    })
    .catch(response => console.log(response))
  }

  render() {
    return(
      <Fragment>
        <div>
          <h2>Number of unfufilled request: {this.state.count}</h2>
        </div>
      </Fragment>
    )
  }
}

export default Counter;