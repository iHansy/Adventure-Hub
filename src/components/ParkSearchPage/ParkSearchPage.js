import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';
import ParkSearchForm from './ParkSearchForm';
import { withStyles } from '@material-ui/core';

//material UI styles
const styles = theme => ({
  container: {
  },
});

class ParkSearchPage extends Component {

  render() {

    const { classes } = this.props;
    let headerText = 'Find a Park';

    return (
      <div className={classes.container}>
        <DashboardAppBar appBarHeader={headerText} />
        <ParkSearchForm />
      </div>
    );
  }
}

const ParkSearchPageStyled = withStyles(styles)(ParkSearchPage);
export default connect(mapStoreToProps)(ParkSearchPageStyled);
