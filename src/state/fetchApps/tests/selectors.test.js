import * as selectors from '../src/selectors';
import { state, sortedCategoriesResponse, sortedAppsBySumPlansPriceResponse, subscriptionsResponse } from '../../../utils/testUtils';

describe('Selectors', () => {
    describe('getIsLoading', () => {
        it('return loading state', () => {
            // Act
            const received = selectors.getIsLoading(state);

            // Assert
            expect(received).toBeFalsy();
        });
    });

    describe('getApps', () => {
        it('return apps', () => {
            // Arrange
            const expected = state.apps;

            // Act
            const received = selectors.getApps(state);

            // Assert
            expect(received).toEqual(expected);
        });
    });

    describe('getError', () => {
        it('return error', () => {
            // Arrange
            const expected = state.error;

            // Act
            const received = selectors.getError(state);

            // Assert
            expect(received).toEqual(expected);
        });
    });

    describe('sortedAppCategories', () => {
        it('return categories listed by alphabetic order', () => {
            // Act
            const received = selectors.sortedAppCategories(state);

            // Assert
            expect(received).toEqual(sortedCategoriesResponse);
        });
    });

    describe('sortedAppsBySumPlansPrice', () => {
        it('return apps listed in an ascendent order by sum of the plans price', () => {
            // Act
            const received = selectors.sortedAppsBySumPlansPrice(state);

            // Assert
            expect(received).toEqual(sortedAppsBySumPlansPriceResponse);
        });
    });

    describe('subscriptions', () => {
        it('return apps subscriptions by app id', () => {
            // Act
            const received = selectors.getSubscriptions(state);

            // Assert
            expect(received).toEqual(subscriptionsResponse);
        });
    });
});
