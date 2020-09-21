import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import CircularProgress from '@material-ui/core/CircularProgress';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';
import ParkSearchForm from './ParkSearchForm';
import ParkSearchCards from './ParkSearchCards';
import { withStyles } from '@material-ui/core';

//material UI styles
const styles = theme => ({
  container: {
    padding: '5em',
  },
  searchParkText: {
    textAlign: 'center',
    fontSize: '1.5em',
    marginTop: '7em',
  },
  loadingSpinner: {
    marginTop: '10em',
    marginBottom: '50em',
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
        {this.props.store.parks.loadingStatus
          &&
          <div className="hideMe">
          <CircularProgress className={classes.loadingSpinner}/>
          </div>
        }
        {!this.props.store.parks.loadingStatus
          && 
          <div className={classes.searchParkText}>
            <p>Search for a park by selecting a state from the dropdown!</p>
          </div>
        }
        <ParkSearchCards />
      </div>
    );
  }
}

const ParkSearchPageStyled = withStyles(styles)(ParkSearchPage);
export default connect(mapStoreToProps)(ParkSearchPageStyled);
