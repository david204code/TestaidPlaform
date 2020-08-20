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
      count: '',
      intervalID: '',
    }
  }

  componentDidMount() {
    // axios.get(`http://localhost:3000/counter`)
    // .then( response => {
    //   // console.log(response.data)
    //   this.setState({count: response.data})
    //   this.intervalID = setTimeout(5000)
    // })
    // .catch(response => console.log(response))
    this.getCount();
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  getCount = () => {
    axios.get(`http://localhost:3000/counter`)
    .then( response => {
      // console.log(response.data)
      this.setState({count: response.data})
      this.intervalID = setTimeout(this.getCount.bind(this), 10000);
      // console.log('hi')
    })
    .catch(response => console.log(response))
  }

  render() {
    return(
      <Fragment>
        <div>
          <h2 className ="text-center">Number of unfufilled request: {this.state.count}</h2>
        </div>
      </Fragment>
    )
  }
}

export default Counter;