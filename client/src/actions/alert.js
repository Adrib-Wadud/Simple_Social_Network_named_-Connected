import {v4 as uuidv4} from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from './types';

export const setAlert = (msg, alerType) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alerType, id}
    });

    setTimeout(()=> dispatch({type: REMOVE_ALERT, payload: id}), 5000);
}