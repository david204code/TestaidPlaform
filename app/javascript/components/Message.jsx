import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

class Message extends React.Component {

  constructor(props) {
    super(props);
    this.state ={ 
      
    }
  }

  render() {
    return (
      <Fragment>
        <div>
          Hello from Message Component
        </div>
      </Fragment>
    )
  }
}

export default Message;