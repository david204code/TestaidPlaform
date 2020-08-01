import React, { Fragment } from 'react';
import Message from './Message';
import axios from 'axios';

class Conversation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      conversationTitle: [this.props.acceptedHelp.attributes.help.title],
      acceptedHelpID: [this.props.acceptedHelp.id],
      event: {}
    };
    
    this.addConversation = this.addConversation.bind(this);

  }

  addConversation = (event) => {
    event.preventDefault()
    const { conversationTitle } = this.state;
    const { acceptedHelpID } = this.state;
    console.log(conversationTitle[0]);
    console.log(acceptedHelpID[0]);

    // update the default headers with axios and pull in csrfToken
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post(`http://localhost:3000/conversations`,
    {
      conversation: {
        accepted_help_id: acceptedHelpID[0],
        title: conversationTitle[0],
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
  }

  render() {
    return (
      <Fragment>
        <div>
          Hello from Conversation Component, AcceptedHelp ID {this.props.acceptedHelp.id}
        </div>
        <form onSubmit ={this.addConversation}>
          <button type ="submit">
            Start
          </button>
        </form>
        <Message />
      </Fragment>
    )
  }
}

export default Conversation;