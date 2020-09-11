import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Card, Grid, Button } from '@material-ui/core';

class CreateAdventurePage extends Component {
  state = {
    
  };

  handleSave = () => {
    this.props.history.push('/dashboard');
  }
  handleCancel = () => {
    this.props.history.push('/dashboard');
  }

  render() {

    return (
      <div>
        <h2>Create Adventure Page</h2>
        <Button onClick={this.handleCancel}>Cancel</Button>
        <Button onClick={this.handleSave}>Save</Button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateAdventurePage);

