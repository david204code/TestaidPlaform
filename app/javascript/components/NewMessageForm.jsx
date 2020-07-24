import React from 'react';
import { API_ROOT, HEADERS } from '../constants/index';
import axios from 'axios';

class NewMessageForm extends React.Component {

  state = {
    title: '',
    conversation_id: this.props.conversation_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ conversation_id: nextProps.conversation_id });
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    // const title = this.state;
    // const conversation_id = this.props;
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    
    axios
    .post("http://localhost:3000/messages",
    {
      title: this.state.title,
      conversation_id: this.props.conversation_id 
    },
    { withCredentials: true }
    ).then(response => {
      if (response.data.status === 'created') {
        this.props.handleSuccessfulAuth(response.data)
      }
    }).catch(error => {
      console.log("message error", error);
    });
    e.preventDefault();

    // fetch(`${API_ROOT}/messages`, {
    //   method: 'POST',
    //   headers: HEADERS,
    //   body: JSON.stringify(this.state)
    // });
    // this.setState({ title: '' });
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
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

export default NewMessageForm;