import React, { useState, useEffect, Fragment } from 'react';
import Message from './Message';
import axios from 'axios';

// const Conversation = (props) => {
//   const [ conversation, setConversation ] = useState({})
//   const [ loaded, setLoaded ] = useState(false)

//   useEffect(() => {
//     axios.get(`http://localhost:3000/conversation/${props.acceptedHelp.id}`)
//     .then( response => {
//       // console.log(response.data)
//       setConversation(response.data)
//       setLoaded(true)
//     })
//     .catch(error => console.log(error))
// }, [])

class Conversation extends React.Component {

  constructor(props) {    
    super(props);

    this.state = {
      conversationTitle: [this.props.acceptedHelp.attributes.help.title],
      acceptedHelpID: [this.props.acceptedHelp.id],
      conversation: [],
      loaded: false,
      event: {}
    };
    
    // this.addConversation = this.addConversation.bind(this);

  };

  // addConversation = (event) => {
  //   event.preventDefault()
  //   const { conversationTitle } = this.state;
  //   const { acceptedHelpID } = this.state;
  //   console.log(conversationTitle[0]);
  //   console.log(acceptedHelpID[0]);

  //   // update the default headers with axios and pull in csrfToken
  //   const csrfToken = document.querySelector('[name=csrf-token]').content
  //   axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

  //   axios.post(`http://localhost:3000/conversations`,
  //   {
  //     conversation: {
  //       accepted_help_id: acceptedHelpID[0],
  //       title: conversationTitle[0],
  //     }
  //   },
  //   { withCredentials: true }
  //   ).then(respone => {
  //     if (respone.data.status === 'created') {
  //       console.log(response)
  //     }
  //   }).catch(error => {
  //     console.log("not created", error);
  //   });
  // }
  componentDidMount = () => {
    axios.get(`http://localhost:3000/conversation/${this.props.acceptedHelp.id}`)
    .then( response => {
      console.log(response.data)
      this.setState({conversation: response.data, loaded: true})
    })
    .catch(error => console.log(error))
  }

  render() {
    // let { conversation } = this.state;
    let loaded = this.state.loaded;
    
    return (
      <div>
        {
          loaded && 
          <Fragment>
            {/* {console.log(conversation)} */}
            <div>
              Hello from Conversation Component, AcceptedHelp ID {this.props.acceptedHelp.id}
            </div>
            {/* <form onSubmit ={this.addConversation}>
              <button type ="submit">
                Start
              </button>
            </form> */}
            <Message conversation ={this.state.conversation} user ={this.props.user} cableApp = {this.props.cableApp}/>
          </Fragment>
        }
      </div>
    )
  }
}

export default Conversation;