import axios from 'axios';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE, ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILES, UPDATE_LIKES
} from './types';
import { setAlert } from './alert';



export const getCurrentProfile = () => async dispatch =>{

    try {
        
        const res = await axios.get('http://localhost:5000/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.msg}
        })
        
    }
};

//Get all Profiles
export const getProfiles = () => async dispatch =>{
    dispatch({type: CLEAR_PROFILE});
    try {
        
        const res = await axios.get('http://localhost:5000/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.msg}
        })
        
    }
};

//Get pro by if

export const getProfileById = userID => async dispatch =>{
    dispatch({type: CLEAR_PROFILE});
    try {
        
        const res = await axios.get(`http://localhost:5000/api/profile/users/${userID}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.msg}
        })
        
    }
};



//Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('http://localhost:5000/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit? 'Profile Updated' : 'Profile Created'));

        if(!edit){
            history.push('/dashboard');
        }


    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.msg}
        })


    
    }
}

//ADD EXPERIENCE
export const addExperience = (formData, history) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('http://localhost:5000/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added!'));
        history.push('/dashboard');
        


    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.msg}
        });
    }
}

//add edu

export const addEducation = (formData, history) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('http://localhost:5000/api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added!'));
        history.push('/dashboard');
        


    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.msg}
        });
    }
};

//Delete education
export const deleteEducation = id => async dispatch =>{
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education Removed!'));
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.msg}
        });
    }
}
//Delete exp

export const deleteExperience = id => async dispatch =>{
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience Removed!'));
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.msg}
        });
    }
}

//DELETE ACCT AND PROFILE

export const deleteAccount = id => async dispatch =>{
    if(window.confirm('Sure that you want to delete your account?')){
        try {
            await axios.delete(`http://localhost:5000/api/profile/`);
    
            dispatch({
                type: CLEAR_PROFILE,
            })
            dispatch({
                type: ACCOUNT_DELETED,
            })

    
            dispatch(setAlert('Account has been deleted permanently'));
            
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.msg}
            });
        }
    }

    
}