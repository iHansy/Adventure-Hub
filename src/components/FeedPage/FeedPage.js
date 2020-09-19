import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';
import FeedCards from './FeedCards';
import { withStyles } from '@material-ui/core';

//material UI styles
const styles = theme => ({
  container: {
      padding: '2em',
      marginBottom: '2em',
      marginTop: '6em',
  },
});

class FeedPage extends Component {

  componentDidMount() {

    this.fetchFeed(); //getting all user's activity from database

    // this.fetchLikes(); //getting all feed likes to compare for like button toggle

  }

  fetchFeed = () => {
    this.props.dispatch({ type: 'FETCH_FEED' });
  }

  // **MAYBE USE THIS IN FUTURE FOR LIKE TOGGLE, COULDN'T GET IT TO WORK NOW
  // fetchLikes = () => {
  //   this.props.dispatch({ type: 'FETCH_LIKES' });
  // }

  render() {

    const { classes } = this.props;
    let headerText = `All User Activity`;

    return (
      <div>
        <DashboardAppBar appBarHeader={headerText} />
        <div className={classes.container}>
          <FeedCards />
        </div>
      </div>
    );
  }
}

const FeedPageStyled = withStyles(styles)(FeedPage);
export default connect(mapStoreToProps)(FeedPageStyled);
