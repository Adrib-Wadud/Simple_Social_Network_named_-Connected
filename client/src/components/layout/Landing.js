import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/dist/styles.css";


const Landing = ({isAuthenticated}) => {
  if(isAuthenticated){
    return <Redirect to='/dashboard'/>
  }

    return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Start your network now!</h1>
          <p className="lead">
            Create you profile/portfolio, share posts and get help from
            others with the same interest and goals as you!
          </p>
          <div className="buttons">
            <div>
            <Link to ="/register" ><AwesomeButton cssModule={AwesomeButtonStyles} type="secondary">Sign up</AwesomeButton></Link>
            <Link to="/login" ><AwesomeButton cssModule={AwesomeButtonStyles} type="primary">Login</AwesomeButton></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
