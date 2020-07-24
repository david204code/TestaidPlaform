import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { username, email, password, password_confirmation } = this.state;

    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }

    axios.post('http://localhost:3000/users', {user}, {withCredentials: true})
      .then(response => {
        if (response.data.status === 'created') {
          this.props.handleSuccessfulAuth(response)
        } else {
          this.setState({
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
            {this.state.errors.map((error) => {
              return <li key={error}>{error}</li>
            })}
          </ul>
        </div>
      )
    };

  render() {

    const { email, password, password_confirmation } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={this.state.email} 
            onChange={this.handleChange} 
            required 
          />

          <input 
            type="password"
            name="password"
            placeholder="Your password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm password"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default SignUp;