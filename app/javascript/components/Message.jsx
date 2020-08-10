import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import ConversationWebSocket from './ConversationWebSocket';

class Message extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      contents: [],
      // content1: [
      //   {id: 35, name: 'jumper', color: 'red', price: 20},
      //   {id: 42, name: 'shirt', color: 'blue', price: 15},
      //   {id: 71, name: 'socks', color: 'black', price: 5},      ] 
    };

    // explaination needed here!
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount(){
    // console.log(this.props.conversation)
    axios.get(`http://localhost:3000/conversation/${this.props.conversation.id}`)
    .then ( response => {
      // console.log(response.data.messages)
      this.setState({contents: response.data.messages});
      // console.log(this.state.contents)
    })
    .catch ( response => console.log(response) )
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
    // {console.log(this.state.contents)}

    const contents = this.state.contents.map((content, key) =>
    <p key ={content.id}>{content.content} from {content.user.email}</p>
    );

    return (
      <Fragment>
        <div>
          {/* {console.log(this.props.user.id)} */}
          {/* {console.log(this.state.contents)} */}
          Hello from Message Component

          {contents}

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