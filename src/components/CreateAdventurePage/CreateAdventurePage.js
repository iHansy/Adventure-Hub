import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DashboardHeader from '../DashboardPage/DashboardHeader';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';
import CreateCard from './CreateCard';

class CreateAdventurePage extends Component {
  state = {
    appBarHeader: 'Add New Adventure',
  };

  render() {

    return (
      <div>
        <DashboardHeader />
        <DashboardAppBar appBarHeader={this.state.appBarHeader}/>
        <CreateCard />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateAdventurePage);

