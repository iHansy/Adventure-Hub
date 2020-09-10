import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Grid, Typography, InputLabel, Button, ButtonGroup, TextField, Link } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

//material UI styles
const styles = theme => ({
  form: {
    marginTop: '3em',
  },
  textFields: {
    padding: '.3em',
    backgroundColor: 'white',
    borderRadius: '.5em',
  },
  createAccountBtn: {
    margin: '2em',
    backgroundColor: 'rgb(216, 174, 95)',
    '&:hover': {
      backgroundColor: 'rgb(196, 150, 67)',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
  },
}); //end material ui

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleCancel = () => {
    this.setState({
      username: '',
      password: '',
    })
    this.props.history.push('/home');
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <form className={classes.form} onSubmit={this.registerUser}>
          <h2>New User</h2>
          {this.props.store.errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {this.props.store.errors.registrationMessage}
            </h3>
          )}
          <div>
            <InputLabel htmlFor="username">
              <TextField
                className={classes.textFields}
                size="small"
                variant="outlined"
                placeholder="username"
                type="text"
                name="username"
                value={this.state.username}
                required
                onChange={this.handleInputChangeFor('username')}
              />
            </InputLabel>
          </div>
          <div>
            <InputLabel htmlFor="password">
              <TextField
                className={classes.textFields}
                size="small"
                variant="outlined"
                placeholder="password"
                type="text"
                type="password"
                name="password"
                value={this.state.password}
                required
                onChange={this.handleInputChangeFor('password')}
              />
            </InputLabel>
          </div>
          <div>
            <ButtonGroup>
              <Button className={classes.createAccountBtn} onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button className={classes.createAccountBtn} type="submit">
                Create Account
              </Button>
            </ButtonGroup>
          </div>
        </form>
      </div>
    );
  }
}

const RegisterFormStyled = withStyles(styles)(RegisterForm);
const RegisterFormStyledRouted = withRouter(RegisterFormStyled)
export default connect(mapStoreToProps)(RegisterFormStyledRouted);
