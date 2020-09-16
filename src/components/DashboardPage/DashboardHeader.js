import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class DashboardHeader extends Component {
  state = {

  };

  render() {
    return (
      <header>
        <div className="dashboardHeader1">
          {this.props.store.user.id &&
            <p id="welcome">Logged in as: {this.props.store.user.username}</p>
          }
        </div>
      </header>
    );
  }
}

export default connect(mapStoreToProps)(DashboardHeader);
