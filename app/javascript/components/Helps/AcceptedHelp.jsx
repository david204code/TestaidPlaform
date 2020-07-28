import React, { useState, useEffect, Fragment } from 'react';

const AcceptedHelp = (props) => {
  console.log(props)
  return (
    <Fragment>
      <div>
        <h1>AcceptedHelp</h1>
        {/* <h1>Title: {props.location.AcceptedHelpProps.item.attributes.help.title}</h1> */}
        {/* <h3>Type of Request: {props.help.request_type}</h3> */}
        {/* <p>Description: {props.help.description}</p> */}
      </div>
    </Fragment>
  )
}

export default AcceptedHelp;