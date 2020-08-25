import React,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getCurrentProfile, deleteAccount} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({getCurrentProfile, deleteAccount, auth:{user}, profile:{profile, loading}}) => {

    useEffect(()=>{
        getCurrentProfile();
    },[getCurrentProfile]);
    return loading && profile === null? <Spinner/> : 
    <Fragment>

       <h1 className="large text-primary">Dashboard</h1> 
        <p className="lead"><FontAwesomeIcon icon={faUserAstronaut}/>Welcome, {user && user.name}</p>
        {profile !== null ? ( 
        <Fragment>
            <DashboardActions/>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
            <div className="my-2">
                <button className='btn btn-danger' onClick={()=>deleteAccount()}>Delete Account</button>
            </div>
        </Fragment>) : (
        <Fragment>
            <p>You haven't setup a profile yet, click on the button below to create one!</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
                Create Profile
            </Link>
        </Fragment>)}
        
    </Fragment>
        
    
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
