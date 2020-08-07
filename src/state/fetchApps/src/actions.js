import { FETCH_START, FETCH_SUCCESS, FETCH_FAIL } from './actionTypes';

export const fetchStart = () => ({ type: FETCH_START })

export const fetchSuccess = apps => {
    return {
        type: FETCH_SUCCESS,
        payload: apps
    }
}

export const fetchFail = error => {
    return {
        type: FETCH_FAIL,
        payload: error
    }
}

const dataRequest = () => {
    return {
        path: 'http://localhost:8088/apps',
        method: 'GET'
    }
}

/**
 * Creates a sync action to fetch the apps from the json file
 *
 * @memberof actions
 * @returns {Object} - Action.
 */
export const fetchApps = () => {
    const request = dataRequest();
    
    return async dispatch => {
        dispatch(fetchStart());
        fetch(request.path)
            .then(response => {
                let data = response.json();
                if(response.ok) {
                    return data;
                } else {
                    throw new Error(data.message);
                }
            })
            .then(data => {
                dispatch(fetchSuccess(data));
            })
            .catch(error => {
                return dispatch(fetchFail(error));
            })
    };
}