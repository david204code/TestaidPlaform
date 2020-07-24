import React from 'react';
import { API_ROOT, HEADERS } from '../constants';
import axios from 'axios';

class NewConversationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  handleChange = e => {
    this.setState({ title: e.target.value });
  };


  //fetch needed to be updated perhaps but need explanation with the e and arrow funciton
  handleSubmit = e => {
    const title = this.state;
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios
    .post("http://localhost:3000/conversations",
    {
      title: this.state.title
    },
    { withCredentials: true }
    ).then(response => {
      if (response.data.status === 'created') {
        this.props.handleSuccessfulAuth(response.data)
      }
    }).catch(error => {
      console.log("registration error", error);
    });
    event.preventDefault();

    // e.preventDefault()
    // fetch(`${API_ROOT}/conversations`, {
    //   method: 'POST',
    //   headers: HEADERS,
    //   body: JSON.stringify(this.state)
    // });
    // this.setState({ title: '' });
  };


  render = () => {
    return (
      <div className ="newConversationForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Conversation:</label>
          <br />
          <input 
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
};

export default NewConversationForm;