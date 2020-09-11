import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import DashboardAppBar from './DashboardAppBar';
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

  handleChange = () => {
    console.log(test);
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <header>
          <div className="dashboardHeader1">
            <p id="welcome">Logged in as: {this.props.store.user.username}</p>
          </div>
        </header>
        <DashboardAppBar />
        <div className={classes.container}>
          <FormControl size="small" variant="filled" className={classes.formControl}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={2}
              onChange={this.handleChange}
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
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
const DashboardPageStyled = withStyles(styles)(DashboardPage);
export default connect(mapStoreToProps)(DashboardPageStyled);
