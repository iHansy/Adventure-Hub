import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Paper, Typography, Card, Grid } from '@material-ui/core';
import './HomePage.css';
// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import HomeHeader from './HomeHeader';

//material UI styles
const styles = theme => ({
  container: {
    marginTop: '2em',
    padding: '2.5em',
    width: '60%',
    margin: 'auto',
  },
  descriptionCard: {
    backgroundColor: 'rgb(240, 240, 240)',
    width: '80%',
    textAlign: 'center',
    height: '100%',
  },
  description: {
    fontSize: '1.25em',
    margin: '2em',
  },
  loginCard: {
    backgroundColor: 'rgb(240, 240, 240)',
    textAlign: 'center',
    height: '100%',
    width: '100%',
  },
});

class HomePage extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {

    const {classes} = this.props;

    return (
      <div>
        <HomeHeader />
        <Grid container className={classes.container}>
          <Grid item xs={6}>
            <Card elevation={4} className={classes.descriptionCard}>
              <p paragraph="true" className={classes.description}>
                Welcome to Adventure Hub! This is a place for you to search, view, and share future adventures. If you're not
                keen to creating an account feel free to continue as a guest and you'll have access to search parks and view
                other's adventures. Enjoy!
              </p>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card elevation={4} className={classes.loginCard}>
              <LoginForm />
                {/* <button onClick={this.onLogin}>
                  Login
              </button> */}
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const HomePageStyled = withStyles(styles)(HomePage);
export default connect(mapStoreToProps)(HomePageStyled);
