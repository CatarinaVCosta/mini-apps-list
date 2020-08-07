import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { numberFormat, applyPrecision } from '../utils/currencyConversion';

/**
 * Gets apps state.
 *
 * @memberof selectors
 * @param {Object} state - Current state.
 * @returns {Array} apps state value.
 */
export const getApps = (state = {}) => state.apps;

/**
 * Gets isLoading state.
 *
 * @memberof selectors
 * @param {Object} state - Current state.
 * @returns {Boolean} isLoading state value.
 */
export const getIsLoading = (state = {}) => state.isLoading;

/**
 * Gets error state.
 *
 * @memberof selectors
 * @param {Object} state - Current state.
 * @returns {String} error state value.
 */
export const getError = (state = {}) => state.error;

/**
 * Gets a sorted list of all categories available in the apps list, in an alphabetic order.
 *
 * @memberof selectors
 * @returns {Array} - Sorted list of all categories.
 */
export const sortedAppCategories = createSelector(
    getApps, apps => {
        if(!isEmpty(apps)) {
            let categoriesList = [];
        
            apps.forEach(app => {
                app.categories.forEach(category => categoriesList.includes(category) ? null : categoriesList.push(category))
            });

            return categoriesList.filter(Boolean).sort();
        }
    }
);

/**
 * Gets a sorted list of the apps in an ascending order by the sum of the plans price.
 *
 * @memberof selectors
 * @returns {Array} - Sorted list of the apps.
 */
export const sortedAppsBySumPlansPrice = createSelector(
    getApps, apps => {
        let appsSubscriptionsSum = [];
    
        if(!isEmpty(apps)) {
            apps.reduce((acc, app, idx) => {
                let totalSubscriptions = 0;

                app.subscriptions.forEach(subscription => totalSubscriptions += subscription.price);

                return appsSubscriptionsSum[idx] = {
                    ...app,
                    totalSubscriptions
                }
            }, {})
        }

        return appsSubscriptionsSum.sort((a, b) => a.totalSubscriptions - b.totalSubscriptions);
    }
);

/**
 * Get apps subscriptions
 *
 * @memberof selectors
 * @returns {Object} - Object with subscription name and price by app id key 
 */
export const getSubscriptions = createSelector(
    sortedAppsBySumPlansPrice, sortedApps => {
        let subscriptionsList = {};
    
        if(!isEmpty(sortedApps)) {
            sortedApps.forEach(({ id, subscriptions }) => {
                if (!subscriptionsList[id]) {
                    subscriptionsList[id] = [];
                }

                subscriptionsList[id] = subscriptions.reduce((acc, {name, price}) => ([
                    ...acc,
                    {
                        name,
                        price: price === 0 ? 'Free' : numberFormat(applyPrecision(price))
                    }
                ]),
                [])
            })
        }

        return subscriptionsList;
    }
);
