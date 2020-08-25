import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {faUserPlus, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth'
// import Badge from 'react-bootstrap/Badge'

const Navbar = ({auth: {isAuthenticated, loading}, logout})=> {
  const authLinks = (
  <ul>
    <li>
      <Link to ="/profiles">People</Link>
    </li>
    <li>
      <Link to ="/posts"> Posts</Link>
    </li>
    <li>
      <Link to ="/dashboard"><FontAwesomeIcon icon={faIdCard}/> Dashboard</Link>
    </li>
    <li>
      <a onClick={logout}>
      
      <span className="hide-sm">Logout</span></a>
    </li> 
  </ul>);

  const guestLink = (<ul>
    <li>
      <Link to ="/profiles">People</Link>
    </li>
    <li>
      <Link to ="/register">Register</Link>
    </li>
    <li>
    
      <Link to ="/login">Login</Link>
      
    </li>
    
  </ul>);
    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to='/'>
          <FontAwesomeIcon icon={faUserPlus} /> Connected
            </Link>
        </h1>
          {!loading && (<Fragment>{isAuthenticated? authLinks: guestLink}</Fragment>)}
      </nav>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}


const mapStateToProps = state =>({
  auth: state.auth
})
export default  connect(mapStateToProps,{logout})(Navbar);
