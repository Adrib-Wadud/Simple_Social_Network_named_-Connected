import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/dist/styles.css";

const ProfileItem = ({profile: {
    user: {_id, name, avatar},
    status,
    company,
    location,
    skills
}}) => {
    /*className='btn btn-primary'*/
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img"></img>
            <div>
                <h2>{name}</h2>
            <p>{status} </p>
            <p>{company && <span> {company}</span>}</p>
            <p className="my-1">{location && <span>{location}</span>}</p>
            <Link to={`/profile/${_id}`} className='btn'>
                <AwesomeButton cssModule={AwesomeButtonStyles} type="primary" size="small">
                View Profile
                </AwesomeButton>
            </Link>
            </div>
            <ul>
                {skills.slice(0,5).map((skill, index)=>(
                    <li key={index} className='text-primary'>
                        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>{skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
