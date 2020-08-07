import * as actionTypes from '../src/actionTypes';
import * as actions from '../src/actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk.withExtraArgument({})];
const mockStore = configureMockStore(middlewares);

describe('Fetch apps actions', () => {
    let store = null;

    beforeEach(() => {
        store = mockStore(null);
    });

    it('should call actionTypes.FETCH_START action type', () => {
        // Arrange
        const expected = [{ type: actionTypes.FETCH_START }];

        // Act
        store.dispatch(actions.fetchStart());

        // Assert
        expect(store.getActions()).toEqual(expected);
    });

    it('should call actionTypes.FETCH_SUCCESS action type', () => {
        // Arrange
        const apps = [{}];
        const expected = [
            { 
                type: actionTypes.FETCH_SUCCESS,
                payload: apps
            }
        ];

        // Act
        store.dispatch(actions.fetchSuccess(apps));

        // Assert
        expect(store.getActions()).toEqual(expected);
    });

    it('should call actionTypes.FETCH_FAIL action type', () => {
        // Arrange
        const error = 'error';
        const expected = [
            { 
                type: actionTypes.FETCH_FAIL,
                payload: error
            }
        ];

        // Act
        store.dispatch(actions.fetchFail(error));

        // Assert
        expect(store.getActions()).toEqual(expected);
    });
});