import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Typography, InputLabel, Button, TextField, Link } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

//material UI styles
const styles = theme => ({
  form: {
    marginTop: '3em',
  },
  textFields: {
    margin: '.3em',
    backgroundColor: 'white',
    borderRadius: '.5em',
  },
  loginBtn: {
    marginTop: '1em',
    width: '25%',
    backgroundColor: 'rgb(216, 174, 95)',
    '&:hover': {
      backgroundColor: 'rgb(196, 150, 67)',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
  },
  links: {
    marginTop: '1.5em',
    fontSize: '.85em',
    marginBottom: '2em',
  },
}); //end material ui

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  //goes to feed page if user continues as guest
  handleGuest = (event) => {
    this.props.history.push('/park-search');
  };

  //goes to create account page if user clicks create account
  handleCreateAccount = (event) => {
    this.props.history.push('/registration');
  }

  render() {

    const { classes } = this.props;

    return (
      <form className={classes.form} onSubmit={this.login}>
        <h2>Existing User</h2>
        {this.props.store.errors.loginMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
          </h3>
        )}
        <div>
          <InputLabel htmlFor="username">
            <TextField
              size="small"
              className={classes.textFields}
              variant="outlined"
              placeholder="username"
              type="text"
              name="username"
              required
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
            />
          </InputLabel>
        </div>
        <div>
          <InputLabel htmlFor="password">
            <TextField
              size="small"
              className={classes.textFields}
              variant="outlined"
              placeholder="password"
              type="password"
              name="password"
              required
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
          </InputLabel>
        </div>
        <div>
          <Button
            size="small"
            className={classes.loginBtn}
            variant="contained"
            type="submit"
            name="submit"
            value="Log In">
            Log In
          </Button>
        </div>
        <div className={classes.links}>
          <Typography>
            <Link onClick={this.handleCreateAccount} component="button" variant="body2">Create Account</Link>
            <br />
            <Link onClick={this.handleGuest} component="button" variant="body2">Continue as guest</Link>
          </Typography>
        </div>
      </form>
    );
  }
}

const LoginFormStyled = withStyles(styles)(LoginForm);
const LoginFormStyledRouted = withRouter(LoginFormStyled)
export default connect(mapStoreToProps)(LoginFormStyledRouted);