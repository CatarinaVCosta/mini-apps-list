import { FETCH_START, FETCH_SUCCESS, FETCH_FAIL } from './actionTypes';
import initialState from './initalState';
import { getOr } from 'lodash/fp';
import { combineReducers } from 'redux';

/**
 * [apps] state reducer.
 *
 * @param {Object} state - Current [apps] state.
 * @param {Object} action - Dispatched action.
 * @returns {Object} New [apps] state.
 */
export const apps = (state = initialState.apps, action = {}) => {
    switch (action.type) {
        case FETCH_SUCCESS:
            return getOr(initialState.apps, 'payload', action);
        case FETCH_FAIL:
        case FETCH_START:
            return initialState.apps;
        default:
            return state;
    }
};

/**
 * [isLoading] state reducer.
 *
 * @param {Object} state - Current [isLoading] state.
 * @param {Object} action - Dispatched action.
 * @returns {Boolean} New [isLoading] state.
 */
export const isLoading = (state = initialState.isLoading, action = {}) => {
    switch (action.type) {
        case FETCH_START:
            return true;
        case FETCH_FAIL:
        case FETCH_SUCCESS:
            return false;
        default:
            return state;
    }
};

/**
 * [error] state reducer.
 *
 * @param {Object} state - Current [error] state.
 * @param {Object} action - Dispatched action.
 * @returns {String} New [error] state.
 */
export const error = (state = initialState.error, action = {}) => {
    switch (action.type) {
        case FETCH_FAIL:
            return getOr(initialState.error, 'payload', action);
        case FETCH_SUCCESS:
        case FETCH_START:
            return initialState.error;
        default:
            return state;
    }
};

export default combineReducers({
    apps,
    isLoading,
    error,
});