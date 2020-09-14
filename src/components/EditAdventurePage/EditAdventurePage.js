import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DashboardHeader from '../DashboardPage/DashboardHeader';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';
import EditCard from './EditCard';

class EditAdventurePage extends Component {
  state = {
    appBarHeader: 'Edit Adventure Page (*make this dynamic)',
  };

  render() {

    return (
      <div>
        <DashboardHeader />
        <DashboardAppBar appBarHeader={this.state.appBarHeader}/>
        <EditCard />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditAdventurePage);