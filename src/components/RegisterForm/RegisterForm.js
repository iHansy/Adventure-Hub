import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import swal from 'sweetalert';
import { withStyles, InputLabel, Button, ButtonGroup, TextField, } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

//material UI styles
const styles = theme => ({
  form: {
    marginTop: '2em',
  },
  textFields: {
    padding: '.3em',
    backgroundColor: 'white',
    borderRadius: '.5em',
  },
  btnGroup: {
    margin: '2em',
    backgroundColor: 'rgb(216, 174, 95)',
  },
  btnSingle: {
    '&:hover': {
      backgroundColor: 'rgb(196, 150, 67)',
    },
  }
}); //end material ui

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  registerUser = (event) => {
    event.preventDefault();
    //making sure confirm password matches
    if (this.state.password !== this.state.confirmPassword) { 
      swal("Error", "passwords do not match");
      return;
    }
    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
      },
    });
    this.props.history.push('/home');
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
    this.props.dispatch({ type: 'CLEAR_REGISTRATION_ERROR' })
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
                type="password"
                name="password"
                value={this.state.password}
                required
                onChange={this.handleInputChangeFor('password')}
              />
            </InputLabel>
          </div>
          <div>
            <InputLabel htmlFor="confirmPassword">
              <TextField
                className={classes.textFields}
                size="small"
                variant="outlined"
                placeholder="confirm password"
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                required
                onChange={this.handleInputChangeFor('confirmPassword')}
              />
            </InputLabel>
          </div>
          <div>
            <ButtonGroup className={classes.btnGroup}>
              <Button className={classes.btnSingle} onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button className={classes.btnSingle} type="submit">
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
