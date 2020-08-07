import React, { Component } from 'react';

/* Material ui */
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

/* Styles */
import './card.css';

import PropTypes from 'prop-types';

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        flex: 1,
        padding: '1rem',
        backgroundColor: 'whitesmoke',
      }
    },
    MuiTypography: {
      h5: {
        color: '#4bc3c9',
        fontWeight: 400
      },
      body2: {
        display: 'flex',
        color: '#6c7680'
      },
      body1: {
        color: '#6c7680',
        display: 'inline-flex',
      }
    },
  },
});

const propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  categories: PropTypes.object,
  subscriptions: PropTypes.array,
}

class CardComponent extends Component {
  render() {
    const { name, description, categories, subscriptions } = this.props;
      return (
        <ThemeProvider theme={theme}>
          <Card classeName='card'>
              <CardContent>
                <div className='name'>
                  <Typography component={'span'} key='typography-name' variant='h5'>
                      {name}
                    </Typography>
                  <Typography component={'span'} key='typography-description' variant='body2'>
                    {description}
                  </Typography>
                  <div className='categories'>
                    <Typography component={'span'} key='typography-categories' variant='body2'>
                      {categories}
                    </Typography>
                  </div>
                  <Typography component={'span'} key='typography-subscriptions' variant='body1'>
                    {subscriptions}
                  </Typography>
                </div>
              </CardContent>
          </Card>
        </ThemeProvider>
      )
  }
}

CardComponent.propTypes =propTypes;

export default CardComponent;