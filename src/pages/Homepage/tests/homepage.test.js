import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import { configure, render } from '@testing-library/react';
import React from 'react';
import extend from 'extend';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Homepage from '../index';
import { state } from '../../../utils/testUtils';

configure({ testIdAttribute: 'data-test' });

const storeStateError = extend(true, {}, state);
storeStateError.error = 'error';

const middlewares = [thunk.withExtraArgument({})];
const mockStore = configureMockStore(middlewares);

describe('<Homepage />', () => {
    it('should render correctly', () => {
        // Arrange
        const store = mockStore(state);

        const { container } = render(
            <Router>
                <Provider store={store}>
                    <Homepage />
                </Provider>
            </Router>
        );

        // Assert
        expect(container).toMatchSnapshot();
    });

    it('should render Menu with all app categories', () => {
        // Arrange
        const store = mockStore(state);

        const { getByTestId } = render(
            <Router>
                <Provider store={store}>
                    <Homepage />
                </Provider>
            </Router>
        );

        const firstCategory = getByTestId('menu-item-category-0');
        const secondCategory = getByTestId('menu-item-category-1');
        const thirdCategory = getByTestId('menu-item-category-2');
        const fourthCategory = getByTestId('menu-item-category-3');


        // Assert
        expect(firstCategory).toBeTruthy();
        expect(secondCategory).toBeTruthy();
        expect(thirdCategory).toBeTruthy();
        expect(fourthCategory).toBeTruthy();
    });

    it('should render error message', () => {
        // Arrange
        const store = mockStore(storeStateError);

        const { getByTestId } = render(
            <Router>
                <Provider store={store}>
                    <Homepage />
                </Provider>
            </Router>
        );

        const error = getByTestId('error-alert');

        // Assert
        expect(error).toBeTruthy();
    });
});