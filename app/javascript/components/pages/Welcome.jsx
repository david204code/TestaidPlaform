import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {

  return (
    <Fragment>
      <div className ="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
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
      </div>
    </Fragment>
  )
}

export default Welcome;