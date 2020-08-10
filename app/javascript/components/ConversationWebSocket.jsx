import React from 'react';

class ConversationWebSocket extends React.Component {
  componentDidMount(){
    this.props.getCoversationData(window.location.href.match(/\d+$/)[0])
    //subscription.create() method is sending params to the subscribed action in ConversationsChannel
    this.props.cableApp.room = this.props.cableApp.cable.subscription.create({
      channel: 'ConversationsChannel',
      room: window.locatio.href.match(/\d+$/)[0]
    },
    {
      received: (updateRoom) => {
        this.props.updateApp(updateRoom)
      }
    })
  }

  render() {
    return(
      <div></div>
    )
  }

}

export default ConversationWebSocket