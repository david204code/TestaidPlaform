import React, { useState, useEffect, Fragment } from 'react';
import { BroswerRouter as Router, Link } from 'react-router-dom';

const Help = (props) => {
  return (
    <Fragment>
      <div>Help ID: {props.id}</div>
      <div>Title: {props.attributes.title}</div>
      <div>Description: {props.attributes.description}</div>
      <div>Request type: {props.attributes.request_type}</div>
      <div>User: {props.attributes.user_id}</div>
    </Fragment>
  )
}

export default Help;