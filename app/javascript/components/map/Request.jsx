import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Request extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      help: [],
      accepted: [],
      acceptedId: '',
    };

    this.acceptRequest = this.acceptRequest.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    axios.get(`/helps/${id}`)
    .then(response => {
      // console.log(response)
      this.setState({help: response.data})
      // console.log(this.state.help.id)
    })
    .catch(error => console.log(error))
  }

  acceptRequest = (event) => {
    event.preventDefault()
    const { help } = this.state;
    const { accepted } = this.state;

    let acceptedId;
    // console.log(help.id);
    let acceptedHelp;

    axios.post(`http://localhost:3000/accepted_helps`, {withCredentials: true, help_id: help.id})
      .then(response => {
        axios.get(`http://localhost:3000/latest/accepted_help`)
          .then(response => {
            // console.log(response.data)
            this.setState({
              accepted: response.data,
              acceptedId: response.data.id,
            })
            // console.log("this.state.accepted.id: " + this.state.accepted.id);
            acceptedId = this.state.accepted.id;
            // console.log("acceptedId: " + acceptedId);
            // this.props.history.push(`/acceptedhelp/${acceptedId}`);
            axios.get(`http://localhost:3000/accepted_help/${acceptedId}`)
              .then (response => {
              // console.log(response.data)
              // console.log(response.data.help)
              this.setState({
                acceptedHelp: response.data
              })
              acceptedHelp = this.state.acceptedHelp;
              // console.log(acceptedHelp)
              // console.log(acceptedHelp.id)
              // console.log(acceptedHelp.help.title)
              axios.post(`http://localhost:3000/conversations`, 
              {
                conversation: {
                title: acceptedHelp.help.title,
                accepted_help_id: acceptedHelp.id,
                }
              },
              { withCredentials: true }
              ).then(respone => {
                if (respone.data.status === 'created') {
                console.log(response)
                }
              }).catch(error => {
                console.log("not created", error);
              });
              axios.get(`http://localhost:3000/acceptedHelpCounter/${this.state.help.id}`) 
              .then(response => {
                // console.log(response)
                if (response.data >= 5) {
                  // console.log(response.data)
                  axios.patch(`http://localhost:3000/updateStatus/${this.state.help.id}`, 
                  // console.log(this.state.help.id),
                  )
                }
              })
              this.props.history.push(`/acceptedhelp/${acceptedId}`);
            })
          })
        .catch(error => console.log(error))    
        })
      .catch(error => console.log('api errors:', error.response)
      )
      alert("Congrgulation on accepting this request");    
    };

  render() {
    const { help } = this.state;
    const { accepted } = this.state;
    return( 
      <div>
        <section className ="jumbotron jumbotron-fluid text-center">
          <div className ="container py-1">
            <h1 className ="display-4">
              Request
            </h1>
            <p className ="lead">
              We are connecting people in our community to help and support each other
            </p>
          </div>
        </section>

        <div>
          <Link
            to ="/map"
            className =""
            role ="button"
          >
            <button className ="">
              Back to the map
            </button> 
          </Link>
        </div>
        
        <div className ="container py-1">
          <h1 className ="text-center display-4">
            Request title: {help.title}
          </h1>

          <h2>Request ID: {help.id}</h2>
          <h2>Description
          </h2>
            <p>
              {help.description}  
            </p>
          <h2>Type of Request: {help.request_type}</h2>
          <p>Status of the request: This request is {help.status}</p>
        </div>


        <div className ="container pb-5 text-center">
          <p className ="text-center pt-3">
            Able to assist? Click on the button below!
          </p>
          <div className ="row">
            <div className ="col-md-4 offset-md-4">
              <form onSubmit={this.acceptRequest}>
                <button type ="submit">
                  Accept this request
                </button>
              </form>
            </div>
          </div>
        </div>

        
      </div>
    )
  }
}

export default Request;