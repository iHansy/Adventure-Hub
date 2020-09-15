import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DashboardHeader from '../DashboardPage/DashboardHeader';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';
import EditCard from './EditCard';

class EditAdventurePage extends Component {

  render() {

    let headerText = '';
    if (this.props.store.adventures.getAdventureInputs.completed === false) {
        headerText =  'Edit Future Adventure'
    } else if (this.props.store.adventures.getAdventureInputs.completed === true) {
        headerText =  'Edit Completed Adventure'
    }

    return (
      <div>
        <DashboardHeader />
        <DashboardAppBar appBarHeader={headerText} />
        <EditCard />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditAdventurePage);
