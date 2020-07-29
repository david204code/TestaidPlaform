import React, { Fragment } from 'react';
import Message from './Message';

class Conversation extends React.Component {

  render() {
    return (
      <Fragment>
        <div>
          Hello from Conversation Component
        </div>
        <Message />
      </Fragment>
    )
  }
}

export default Conversation;