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

    axios.post(`http://localhost:3000/helps/${help.id}/accepted_helps`, {withCredentials: true, help_id: help.id})
      .then(response => {
        axios.get(`http://localhost:3000/helps/${help.id}/accepted_help/last`)
        .then(response => {
          // console.log(response.data)
          this.setState({
            accepted: response.data,
            // acceptedId: response.data.id,
          })
          // console.log(this.state.accepted.id);
          acceptedId = this.state.accepted.id;
          console.log(acceptedId);
          this.props.history.push(`/helps/${help.id}/acceptedhelp/${acceptedId}`, {withCredentials: true, help_id: help.id});
        })
        .catch(error => console.log(error))
    
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data)
        } else {
          this.setState ({
            errors: response.data.errors
          })
        }
      })
      .catch(error => console.log('api errors:', error.response)
    )
    alert("Congrgulation on accepting this request");    
    // this.props.history.push(`/dashboard`);
    // window.location.reload(); 
    
    // axios.get(`http://localhost:3000/helps/${help.id}/accepted_help/last`, {withCredentials: true, help_id: help.id})
    //   .then(response => {
    //     console.log(response.data)
    //     this.setState({accepted: response.data})
    //     console.log(this.state.accepted.id);
    //   })
    //   .catch(error => console.log(error))

    // this.props.history.push(`/helps/${help.id}/acceptedhelp/${accepted.id}`, {withCredentials: true, help_id: help.id, accepted_id: accepted.id});
    // this.props.history.push(`/acceptedhelp`);
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
            {/* <div className ="col-md-4">
              <a
                // target ="_blank"
                href ="http://localhost:3000/message"
              >
                <button>
                  Send a message
                </button>
              </a>
              <Link
                to ="/message"
                className =""
                role ="button"
              >
                <button>
                  Send a message
                </button>
              </Link>
            </div> */}
          </div>
        </div>

        
      </div>
    )
  }
}

export default Request;