import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardAppBar from './DashboardAppBar';
import DashboardCards from './DashboardCards';
import DashboardHeader from './DashboardHeader';
import { withStyles, FormControl, Select, MenuItem, Typography, Link } from '@material-ui/core';
import mapStoreToProps from '../../redux/mapStoreToProps';

//material UI styles
const styles = theme => ({
  container: {
    padding: '2em',
  },
  formControl: {
    width: '25%',
  },
  addAdventure: {
    marginTop: '.50em',
    marginLeft: '.75em',
    fontSize: '1em',
  },
});


class DashboardPage extends Component {

  state = {
    adventureStatus: 1,
    adventureComplete: false,
    appBarHeader: 'Bucket List Dashboard',
  };

  //this is making sure the dashboard view stays consistent with what type of adventure
  //was created and what the type of adventure the dropdown is currently on
  componentDidMount = () => {
    console.log('loading all adventures...');
    if (this.props.store.adventures.completeStatus === true) {
      this.setState({
        adventureStatus: 2,
        adventureComplete: true,
      })
    }
    this.fetchAdventures(); //getting adventure details for current user on page load
  }

  fetchAdventures = () => {
    this.props.dispatch({ type: 'FETCH_ADVENTURES' })
  }

  handleAdventureStatus = (property, event) => {
    console.log(this.state);
    this.setState({
      [property]: event.target.value,
      adventureComplete: !this.state.adventureComplete
    })
  }

  createAdventure = () => {
    this.props.dispatch({ type:'SET_COMPLETE_STATUS', payload: this.state.adventureComplete});
    this.props.history.push('/create-adventure');
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <DashboardHeader />
        <DashboardAppBar appBarHeader={this.state.appBarHeader}/>
        <div className={classes.container}>
          <FormControl size="small" variant="filled" className={classes.formControl}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={this.state.adventureStatus}
              onChange={(event) => this.handleAdventureStatus('adventureStatus', event)}
            >
              <MenuItem value={1}>Future Adventures</MenuItem>
              <MenuItem value={2}>Completed Adventures</MenuItem>
            </Select>
          </FormControl>
          <div>
            <Typography>
              <Link
                onClick={this.createAdventure}
                component="button"
                variant="h6"
                className={classes.addAdventure}>
                Add new adventure
              </Link>
            </Typography>
          </div>
          <DashboardCards adventureComplete={this.state.adventureComplete} />
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
const DashboardPageStyled = withStyles(styles)(DashboardPage);
export default connect(mapStoreToProps)(DashboardPageStyled);
