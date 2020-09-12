import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DashboardHeader from '../DashboardPage/DashboardHeader';
import NewAdventureCard from './NewAdventureCard';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';

class CreateAdventurePage extends Component {
  state = {
    appBarHeader: 'New Adventure',
  };

  render() {

    return (
      <div>
        <DashboardHeader />
        <DashboardAppBar appBarHeader={this.state.appBarHeader}/>
        <NewAdventureCard />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateAdventurePage);

