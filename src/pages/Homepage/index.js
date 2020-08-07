import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { isEmpty, debounce } from 'lodash';

/* Material ui */
import { Divider, CircularProgress, MenuItem } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

/* Components */
import MenuComponent from '../../components/Menu/index';
import TextFieldComponent from '../../components/TextField/index';

/* Containers */
import { fetchApps } from '../../state/fetchApps/src/actions';
import { 
    sortedAppsBySumPlansPrice, 
    sortedAppCategories, 
    getIsLoading, 
    getError 
} from '../../state/fetchApps/src/selectors';
import ListAllApps from './ListApps/index';

/* Styles */
import './homepage.css'; 

import PropTypes from 'prop-types';

const SEARCH_LABEL = 'Search by app name';

const propTypes = {
    sortedApps: PropTypes.array,
    isloading: PropTypes.bool,
    error: PropTypes.string,
    sortedAppCategories: PropTypes.array,
}

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredAppsByCategory: [],
            filteredAppsByName: [],
        };

        this._filterAppsByCategory = category => this.filterAppsByCategory.bind(this, category);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchApps());
    }

    filterAppsByCategory = category => {
        const { sortedApps } = this.props;

        const filteredApps = sortedApps.filter(app => app.categories.includes(category));

        this.setState({ 
            filteredAppsByName: [],
            filteredAppsByCategory: filteredApps,
        })
    }

    searchApp = event => {
        event.preventDefault();

        const { sortedApps } = this.props;
        let filteredApps = [];

        const appName = event.target[0].value;

        if(appName) {
            filteredApps = sortedApps.filter(app => app.name === appName);
        }

        this.setState({ 
            filteredAppsByName: filteredApps,
            filteredAppsByCategory: [],
        })
    }

    appsToList = () => {
        const { filteredAppsByCategory, filteredAppsByName } = this.state;
        const { sortedApps } = this.props;
        
        if(isEmpty(filteredAppsByCategory) && isEmpty(filteredAppsByName)) {
            return sortedApps;
        } else {
            if(isEmpty(filteredAppsByCategory)) {
                return filteredAppsByName;
            } 
            return filteredAppsByCategory;
         }
    }

    onChangeSearchInput = evt => {
        this.debouncedSearch(evt.target.value);
    };

    debouncedSearch = debounce(value => {
        const { sortedApps } = this.props;
        let filteredApps = [];

        filteredApps = sortedApps.filter(app => app.name === value)

        this.setState({ 
            filteredAppsByName: filteredApps,
            filteredAppsByCategory: [],
        })
    }, 500);

    renderLoading = () => {
        return (
            <div data-test="loading" className='loading'>
                <CircularProgress />
            </div>
        )
    }

    renderMenu = () => {
        const { sortedAppCategories } = this.props;

        return(
            <Fragment>
                {!isEmpty(sortedAppCategories) && sortedAppCategories.map((category, index) => {
                    return (
                        <div key={`menu-item-${index}`}>
                            <MenuComponent 
                                item={
                                    <MenuItem 
                                        data-test={`menu-item-category-${index}`}
                                        name={'menuItem'} 
                                        onClick={this._filterAppsByCategory(category)}
                                    >
                                        {category}
                                    </MenuItem>
                                }
                            />
                            <Divider />
                        </div>
                    )
                })}
            </Fragment>
        )        
    }

    render() {
        const { isLoading, error } = this.props;

        return (
            <Fragment>
                {isLoading 
                    ? this.renderLoading()
                    : error
                        ? <Alert data-test="error-alert" severity="error">{error.message}</Alert>
                        : (
                            <div className='wrapper'>
                                <div className='menu'>
                                    <h1 className='title'>Categories</h1>
                                    {this.renderMenu()}
                                </div>
                                <div className='body'>
                                    <form data-test="search-form" >
                                        <TextFieldComponent label={SEARCH_LABEL} onChange={this.onChangeSearchInput}/>
                                        <ListAllApps apps={this.appsToList()} />
                                    </form>
                                </div>
                            </div>
                        )
                }
            </Fragment>
        )
    }
}

HomePage.propTypes = propTypes;

const mapStateToProps = state => ({
    isLoading: getIsLoading(state),
    error: getError(state),
    sortedApps: sortedAppsBySumPlansPrice(state),
    sortedAppCategories: sortedAppCategories(state),
});

export default connect(mapStateToProps)(HomePage);
