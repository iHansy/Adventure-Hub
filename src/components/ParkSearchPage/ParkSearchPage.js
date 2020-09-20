import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';
import ParkSearchForm from './ParkSearchForm';
import ParkSearchCards from './ParkSearchCards';
import { withStyles } from '@material-ui/core';

//material UI styles
const styles = theme => ({
  container: {
    padding: '5em',
  },
});

class ParkSearchPage extends Component {

  render() {

    const { classes } = this.props;
    let headerText = 'National Park Search';

    return (
      <div className={classes.container}>
        <DashboardAppBar appBarHeader={headerText} />
        <ParkSearchForm />
        <ParkSearchCards />
      </div>
    );
  }
}

const ParkSearchPageStyled = withStyles(styles)(ParkSearchPage);
export default connect(mapStoreToProps)(ParkSearchPageStyled);
