import React, { Component } from 'react';

/* Material ui */
import MenuList from '@material-ui/core/MenuList';

import PropTypes from 'prop-types';

const propTypes = {
    item: PropTypes.node,
}

class MenuComponent extends Component {
    render() {
        const { item } = this.props;
        return (
            <MenuList>
                {item}
            </MenuList>
        )
    }
}

MenuComponent.propTypes = propTypes;

export default MenuComponent;