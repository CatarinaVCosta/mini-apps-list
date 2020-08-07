import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

/* Components */
import CardComponent from '../../../components/Card/index';

/* Material ui */
import Pagination from '@material-ui/lab/Pagination';
import Alert from '@material-ui/lab/Alert';

/* Containers */
import { getSubscriptions } from '../../../state/fetchApps/src/selectors';

/* Styles */
import './listApps.css';

import PropTypes from 'prop-types';

const propTypes = {
    apps: PropTypes.array,
    subscriptions: PropTypes.object,
    appsFoundInSearch: PropTypes.bool
}

const ERROR_MESSAGE = 'Something went wrong.';

class ListAllApps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            appsPerPage: 3,
            pageNumbers: 1,
            apps: props.apps
        };
    }

    componentDidMount() {
        const appsToListPerPage = this.getListOfAppsToDisplay()

        this.setState({
            pageNumbers: this.getPageNumbers(appsToListPerPage),
        })
    }

    componentDidUpdate(prevProps) {
        const { apps } = this.props;

        if (prevProps.apps !== apps) {
            const appsToListPerPage = this.getListOfAppsToDisplay()

            this.setState({
                pageNumbers: this.getPageNumbers(appsToListPerPage),
            })
        }
    }

    handleClick = (event, value) => {
        this.setState({
            currentPage: value
        });
    }

    getPageNumbers = appsToListPerPage => {
        const { apps } = this.props;
        let pageNumbersList = [];

        if(!isEmpty(apps)) {
            for (let i = 1; i <= Math.ceil(apps.length / appsToListPerPage.length); i++) {
                pageNumbersList.push(i);
            }
        }

        return pageNumbersList.length;
    }

    getListOfAppsToDisplay = () => {
        const { apps } = this.props;
        const { currentPage, appsPerPage } = this.state;

        if(!isEmpty(apps)) {
            const indexOfLastApp = currentPage * appsPerPage;
            const indexOfFirstApp = indexOfLastApp - appsPerPage;

            return apps.slice(indexOfFirstApp, indexOfLastApp);
        }
    }

    renderSubscriptions = id => {
        const { subscriptions } = this.props;

        return subscriptions[id].map(({name, price}, idx) => 
            <div className='subscriptions' data-test={`app-subscription-${id}`} key={`subscription-${idx}`}>
                <label className='subscriptionName' key={`subscription-name-${id}`}>
                    {name}
                </label>
                <label className='subscriptionPrice' key={`subscription-price-${id}`}>
                    {price}
                </label>
            </div>
        )
    }

    renderCategories = categories => {
        return categories.map(category => 
            <label className='categories'>
                {category}
            </label>
        ).reduce((prev, curr) => [prev, <div className='categories'>/</div>, curr])
    }

    render() {
        const { currentPage, pageNumbers } = this.state;

        const appsToListPerPage = this.getListOfAppsToDisplay();

        return (
            <div className='cardWrapper'>
                {!isEmpty(appsToListPerPage)
                    ? (<Fragment>
                        {appsToListPerPage.map(({id, name, description, categories}) => {
                            const allSubscriptions = this.renderSubscriptions(id);
                            const allCategories = this.renderCategories(categories)
                            return (
                                <div 
                                    key={`app-card-${id}`} 
                                    className='cardComponent' 
                                    data-test={`app-card-${id}`} 
                                >
                                    <CardComponent 
                                        name={name} 
                                        description={description} 
                                        categories={allCategories}
                                        subscriptions={allSubscriptions}
                                    />
                                </div>
                            )
                        })}
                        <Pagination 
                            count={pageNumbers} 
                            shape="rounded" 
                            onChange={this.handleClick} 
                            page={currentPage}
                        />
                    </Fragment>)
                    : <Alert data-test="error-alert" severity="error">{ERROR_MESSAGE}</Alert>
                }
            </div>
        )
    }
}

ListAllApps.propTypes = propTypes;

const mapStateToProps = state => ({
    subscriptions: getSubscriptions(state),
});

export default connect(mapStateToProps)(ListAllApps);