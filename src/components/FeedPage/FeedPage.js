import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DashboardHeader from '../DashboardPage/DashboardHeader';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';

class FeedPage extends Component {

  render() {

    let headerText = 'Feed';

    return (
      <div>
        <DashboardHeader />
        <DashboardAppBar appBarHeader={headerText} />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(FeedPage);
