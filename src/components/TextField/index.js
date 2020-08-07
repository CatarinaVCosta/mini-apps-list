import React, { Component } from 'react';

/* Material ui */
import { TextField } from '@material-ui/core';

import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func
}

class TextFieldComponent extends Component {    
    render() {
        const { label, onChange } = this.props;
        return (
            <TextField 
                fullWidth 
                id="text-field" 
                label={label} 
                type="search" 
                variant='outlined' 
                size='small'
                onChange={onChange}
            />
        );
    }
}

TextFieldComponent.prototypes = propTypes;

export default TextFieldComponent;