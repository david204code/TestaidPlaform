import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Footer = () => {
  return (
    <div className ="navBody">
      <footer className="mastfoot mt-auto">
        <div className="inner">
          <p>Example footer <a href="https://getbootstrap.com/">Bootstrap</a>, </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer;