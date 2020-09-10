import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Paper, Typography, Card, Grid } from '@material-ui/core';
// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import HomeHeader from '../HomePage/HomeHeader';

const styles = theme => ({
  container: {
    marginTop: '2em',
    padding: '2.5em',
    width: '40%',
    margin: 'auto',
  },
  createAccountCard: {
    backgroundColor: 'rgb(240, 240, 240)',
    textAlign: 'center',
    minHeight: '22em',
    width: '100%',
  },
})

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {

    const { classes } = this.props;

    return (
      <div>
        <HomeHeader />
        <Grid className={classes.container}>
          <Grid item xs={12}>
            <Card elevation={4} className={classes.createAccountCard}>
              <RegisterForm />
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const RegisterPageStyled = withStyles(styles)(RegisterPage);
export default connect(mapStoreToProps)(RegisterPageStyled);
