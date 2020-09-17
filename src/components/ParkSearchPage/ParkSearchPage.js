import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DashboardHeader from '../DashboardPage/DashboardHeader';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';

class ParkSearchPage extends Component {

  render() {

    let headerText = 'Park Search';

    return (
      <div>
        <DashboardAppBar appBarHeader={headerText} />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ParkSearchPage);
