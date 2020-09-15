import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DashboardHeader from '../DashboardPage/DashboardHeader';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';
import CreateCard from './CreateCard';

class CreateAdventurePage extends Component {
  
  render() {

    let headerText = '';
    if (this.props.store.adventures.completeStatus === false) {
        headerText =  'Add Future Adventure'
    } else if (this.props.store.adventures.completeStatus === true) {
        headerText =  'Add Completed Adventure'
    }


    return (
      <div>
        <DashboardHeader />
        <DashboardAppBar appBarHeader={headerText}/>
        <CreateCard />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateAdventurePage);

