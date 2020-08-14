// Run this example by adding <%= javascript_pack_tag 'react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from '../components/App';
import actionCable from 'actioncable';

document.addEventListener('DOMContentLoaded', () => {

  const CableApp = {}
  CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')
  
  ReactDOM.render(
    <Router>
      <App cableApp ={CableApp} />
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})
