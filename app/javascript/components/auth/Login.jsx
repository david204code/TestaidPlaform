import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { email, password } = this.state;

    let user = {
      email: email,
      password: password
    }

    axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
      .then(response => {
        // console.log(response);
        if (response.data.logged_in) {
          // this.props.handleSuccessfulAuth(response.data)
          this.props.handleSuccessfulAuth(response)
        } else {
          this.setState ({
            errors: response.data.errors
          })
        }
      })
      .catch(error => console.log('api errors:', error)
    )
  };

        handleErrors = () => {
          return (
            <div>
              <ul>
                {this.state.errors.map(error => {
                  return <li key={error}>{error}</li>
                })}
              </ul>
            </div>
          )
      };    



  render() {
    return (
      <div className ="">
        <div className ="text-center">
          <h1>Welcome back!</h1>
          <h4>Great to see you, log in here</h4>
        </div>
        <form onSubmit={this.handleSubmit}>
            <div className ="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="form-control"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className ="form-group">
              <label>Password</label>
              <input 
                type="password"
                name="password"
                placeholder="Your password"
                className="form-control"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className ="text-center mt-2">
              <button type="submit" className ="btn btn-success mt-1">
                Login
                </button>
            </div>
        </form>
          
          <div>
            {
              this.state.errors ? this.handleErrors() :null
            }
          </div>
      </div>
    );
  }
}

export default Login 