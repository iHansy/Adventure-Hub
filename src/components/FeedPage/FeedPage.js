import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DashboardHeader from '../DashboardPage/DashboardHeader';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';
import FeedCards from './FeedCards';
import { withStyles } from '@material-ui/core';

//material UI styles
const styles = theme => ({
  container: {
      padding: '2em',
      marginBottom: '2em',
  },
});

class FeedPage extends Component {

  componentDidMount() {

    this.fetchFeed(); //getting all user's activity from database

  }

  fetchFeed = () => {
    this.props.dispatch({ type: 'FETCH_FEED' });
  }

  render() {

    const { classes } = this.props;
    let headerText = `All User Activity`;

    return (
      <div>
        <DashboardHeader />
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
