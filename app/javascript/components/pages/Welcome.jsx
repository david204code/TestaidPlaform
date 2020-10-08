import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Welcome = () => {

  return (
    <div className ="navBody">
      <div className ="text-center cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <main role="main" className="inner cover">
          <h1 className="cover-heading">Aid Platform</h1>
          <p className="lead">We are connecting people and buidling a community in a time of need and also in the time of goodness. Whether you want to provide generous help or recieve help in time of difficulties....</p>
          <p className="lead">
          <Link
            to="/home"
            className="btn btn-lg btn-secondary"
            role="button"
          >
            Find out more....
          </Link>
          </p>
        </main>
      </div>

      {/* <h1 className ="text-center">Aid Platform</h1>
      <h4 className ="text-center">Help those around you, your very own local
        neighbour aid platform for your own neighbour!
      </h4>
      
      <div className ="container text-center">
        <p className ="pt-4">
          We are connecting people and buidling a community in a time of need and 
          also in the time of goodness. Whether you want to provide generous help or 
          recieve help in time of difficulties....
        </p>
      </div> */}

      {/* <div className ="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className ="jumbotron jumbotron-fluid bg-transparent">
          <div className ="container secondary-color text-center">
            <h1 className ="display-4">Aid Platform</h1>
              <p className ="lead">
                An aid platform for your neighborhood! Helping your neightborhood with technology.
              </p>
            <hr className ="my-4"/>
            <Link
              to="/home"
              className="btn btn-lg custom-button"
              role="button"
            >
              Find out more....
            </Link>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Welcome;