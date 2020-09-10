import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Paper, Typography, Card, Grid } from '@material-ui/core';

//material UI styles

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

  render() {

    const {classes} = this.props;

    return (
      <div>
        <form onSubmit={this.registerUser}>
          <h2>New User</h2>
          {this.props.store.errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {this.props.store.errors.registrationMessage}
            </h3>
          )}
          <div>
            <label htmlFor="username">
            <input
                type="text"
                name="username"
                value={this.state.username}
                required
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
            <input
                type="password"
                name="password"
                value={this.state.password}
                required
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <input type="submit" name="submit" value="Register" />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
