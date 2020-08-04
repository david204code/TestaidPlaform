import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

class Message extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      content :"", 
    };

    // explaination needed here!
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount(){
    // console.log(this.props.conversation)
  }

  handleSubmit = event => {
    event.preventDefault()
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    let content = content;

    axios.post(`http://localhost:3000/messages`,
      {
        content: this.state.content,
        conversation_id: this.props.conversation.id,
        user_id: this.props.user.id
      },
      { withCredentials: true }
    ).then(response => {
      if (response.status === 200) {
        console.log("Message created")
      }
    }).catch(error => {
      console.log("not created", error);
    });
    this.setState({
      content: ''
    });
  };

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  
  render() {
    return (
      <Fragment>
        <div>
          {/* {console.log(this.props.user.id)} */}
          Hello from Message Component
        <form onSubmit ={this.handleSubmit}>
          <textarea 
            row ="1" 
            cols ="50"
            name ="content"
            required
            value ={this.state.content}
            onChange ={this.handleChange}
          />
          
          <button type ="submit">
            Start
          </button>
        </form>
        </div>
      </Fragment>
    )
  }
}

export default Message;