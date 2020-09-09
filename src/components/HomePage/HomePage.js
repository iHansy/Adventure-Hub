import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Paper, Typography, Card, Grid } from '@material-ui/core';
import './HomePage.css';
// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

//material UI styles
const styles = theme => ({
  container: {
    marginTop: '2em',
    padding: '2.5em',
    width: '60%',
    margin: 'auto',
  },
  descriptionCard: {
    backgroundColor: 'rgb(228, 228, 228)',
    width: '80%',
    textAlign: 'center',
  },
  description: {
    fontSize: '1.25em',
    margin: '2em',
  },
});

class HomePage extends Component {
  state = {
    heading: 'Class Component',

  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {

    const { classes } = this.props;

    return (
      <div>


        <header className="homeHeader">
          <h1>Adventure Hub</h1>
        </header>
        <Grid container className={classes.container}>
          <Grid item xs={6}>
            <Card elevation={5} className={classes.descriptionCard}>
              <p paragraph className={classes.description}>
                Welcome to Adventure Hub! This is a place for you to search, view, and share future adventures. If you're not
                keen to creating an account feel free to continue as a guest and you'll have access to search parks and view
                other's adventures. Enjoy!
              </p>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <RegisterForm />
              <center>
                <h4>Already a Member?</h4>
                <button className="btn btn_sizeSm" onClick={this.onLogin}>
                  Login
              </button>
              </center>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const HomePageStyled = withStyles(styles)(HomePage);

export default connect(mapStoreToProps)(HomePageStyled);
