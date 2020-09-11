import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DashboardAppBar from './DashboardAppBar';

class DashboardPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
        <header>
          <div className="dashboardHeader1">
            <p id="welcome">Logged in as: {this.props.store.user.username}</p>
          </div>
        </header>
        <DashboardAppBar />
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(DashboardPage);
