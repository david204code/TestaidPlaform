import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

class Message extends React.Component {
  
  constructor(props) {
    super(props);
    this.state ={ 
    };
  }
  
  componentDidMount(){
    // console.log(this.props.conversation)
  }

  handleSubmit = event => {
    event.preventDefault()
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const content = content;

    axios.post(`http://localhost:3000/messages`,
      {
        content: "content",
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
  }
  
  render() {
    return (
      <Fragment>
        <div>
          {/* {console.log(this.props.user.id)} */}
          Hello from Message Component
        <form onSubmit ={this.handleSubmit}>
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