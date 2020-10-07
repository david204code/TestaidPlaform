import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DirectUpload } from 'activestorage';
import ActiveStorageProvider from 'react-activestorage-provider';

class SignUp extends React.Component {

  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
      governmentId: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    if (event.target.name === 'governmentId') {
      this.setState({
        [event.target.name]: event.target.files[0]
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  // handleSubmit = (event, file) => {
  //   event.preventDefault()
  //   let { email, password, password_confirmation, governmentId } = this.state;

  //   let user = {
  //     email: email,
  //     password: password,
  //     password_confirmation: password_confirmation,
  //     governmentId: governmentId,
  //   }

  //   axios.post('http://localhost:3000/users', {user}, {withCredentials: true})
  //     .then(response => {
  //       // console.log(response);
  //       if (response.data.status === 'created') {
  //         this.props.handleSuccessfulAuth(response)
  //         // console.log(response)
  //       } else {
  //         this.setState({
  //           errors: response.data.errors
  //         })
  //       }
  //     })
  //     .then(data => (this.state.governmentId, data))
  //     .catch(error => console.log('api errors:', error)
  //   )    
  // };

  handleSubmit = (event) => {
    event.preventDefault()
    console.log('submitting this form...')

    let user = {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    }
    
    axios.post('http://localhost:3000/users', {user}, {withCredentials: true})
        .then(response => {
          console.log(response);
          if (response.data.status === 'created') {
            this.props.handleSuccessfulAuth(response)
            // this.setState({
            //   governmentId: response.data.user.id
            // })
            this.uploadFile(this.state.governmentId, response)
            console.log(this.state.governmentId)
          } else {
            this.setState({
              errors: response.data.errors
            })
          }
        })
        // .then(console.log(this.state.governmentId))
        // .then(data => this.uploadFile(this.state.governmentId, data))
        .catch(error => console.log('api errors:', error))
  }

  uploadFile = (file, user) => {
    const upload = new DirectUpload(file, 'http://localhost:3000/rails/active_storage/direct_uploads')
    upload.create((error, blob) => {
      if (error) {
        console.log(error)
      } else {
        // console.log('there is no error....')
        fetch(`http://localhost:3000/users/${localStorage.userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({governmentId: blob.signed_id})
        })
        // axios.put(`http://localhost:3000/users/${localStorage.userId}`, {body: JSON.stringify({governmentId: blob.signed_id})})
        // .then(response => console.log(response))
        // .then(response => this.updateCurrentUser(response))
        // .then(response => response.json())
        // .then(response => console.log(response))
        // .then(data => this.props.updateCurrentUser(data))
      }
    })
  }

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
          <label>Upload your government approved ID to verify your identity</label>
          <input type ='file' name ='governmentId' onChange ={this.handleChange} />
          <button type="submit">Register</button>
        </form>
        {/* <form onSubmit ={this.handleSubmit}>
          <label>Email:</label>
          <input type ='text' name ='email' value ={this.state.email} onChange ={this.handleChange} />
          <label>Password:</label>
          <input type ='password' name ='password' value ={this.state.password} onChange ={this.handleChange} />
          <label>Password Confirmation:</label>
          <input type ='password' name ='password_confirmation' value ={this.state.password_confirmation} onChange ={this.handleChange} />
          <label>Upload your governmentId:</label>
          <input type ='file' name ='governmentId' onChange ={this.handleChange} />
          <input type ='submit' value ='Create My Account' onSubmit ={this.handleSubmit}/>
        </form> */}
      </div>
    );
  }
}

export default SignUp;