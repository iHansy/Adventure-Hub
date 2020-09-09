import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class FeedPage extends Component {

  handleHome = () => {
    this.props.history.push('/home');
  }

  render() {
    return (
      <div className="container">
        <div>
          <p>FEED WILL GO HERE</p>
          <button onClick={this.handleHome}>Go Home</button>
        </div>
      </div>
    )
  }
};

export default connect(mapStoreToProps)(FeedPage);
