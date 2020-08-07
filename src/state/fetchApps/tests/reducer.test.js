import * as reducer from '../src/reducer';
import * as actionTypes from '../src/actionTypes';
import initialState from '../src/initalState';
import { state } from '../../../utils/testUtils';

describe('reducer', () => {
    describe('apps', () => {
        it('should handle FETCH_START', () => {
            // Arrange
            const expected = initialState.apps;
    
            // Act
            const received = reducer.apps(
                initialState.apps,
                { type: actionTypes.FETCH_START }
            );
    
            // Assert
            expect(received).toEqual(expected);
        });

        it('should handle FETCH_SUCCESS', () => {
            // Arrange
            const expected = state.apps
    
            // Act
            const received = reducer.apps(
                initialState.apps,
                {
                    type: actionTypes.FETCH_SUCCESS,
                    payload: state.apps
                }
            );
    
            // Assert
            expect(received).toEqual(expected);
        });
    
        it('should handle FETCH_FAIL', () => {
            // Arrange
            const expected = initialState.apps;
    
            // Act
            const received = reducer.apps(
                initialState.apps,
                { type: actionTypes.FETCH_FAIL }
            );
    
            // Assert
            expect(received).toEqual(expected);
        });
    });

    describe('isLoading', () => {
        it('should handle FETCH_START', () => {
            // Act
            const received = reducer.isLoading(
                initialState.isLoading,
                { type: actionTypes.FETCH_START }
            );
    
            // Assert
            expect(received).toBeTruthy();
        });

        it('should handle FETCH_SUCCESS', () => {    
            // Arrange
            const expected = initialState.isLoading;

            // Act
            const received = reducer.isLoading(
                initialState.isLoading,
                {
                    type: actionTypes.FETCH_SUCCESS,
                    payload: true
                }
            );
    
            // Assert
            expect(received).toEqual(expected);
        });
    
        it('should handle FETCH_FAIL', () => {
            // Arrange
            const expected = initialState.isLoading;
    
            // Act
            const received = reducer.isLoading(
                initialState.isLoading,
                {
                    type: actionTypes.FETCH_SUCCESS,
                    payload: true
                }
            );
    
            // Assert
            expect(received).toEqual(expected);
        });
    });

    describe('error', () => {
        it('should handle FETCH_START', () => {
            // Arrange
            const expected = initialState.error;
    
            // Act
            const received = reducer.error(
                initialState.error,
                { type: actionTypes.FETCH_START }
            );
    
            // Assert
            expect(received).toEqual(expected);
        });

        it('should handle FETCH_SUCCESS', () => {
            // Arrange
            const expected = initialState.error;
    
            // Act
            const received = reducer.error(
                initialState.error,
                { type: actionTypes.FETCH_SUCCESS }
            );
    
            // Assert
            expect(received).toEqual(expected);
        });
    
        it('should handle FETCH_FAIL', () => {
            // Arrange
            const expected = 'error';
    
            // Act
            const received = reducer.error(
                initialState.error,
                { type: actionTypes.FETCH_FAIL, payload: 'error' }
            );
    
            // Assert
            expect(received).toEqual(expected);
        });
    });
});