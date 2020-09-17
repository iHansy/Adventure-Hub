import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardAppBar from './DashboardAppBar';
import DashboardCards from './DashboardCards';
import { withStyles, FormControl, Select, MenuItem, Typography, Link, Breadcrumbs, Button, Tab, Tabs } from '@material-ui/core';
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import mapStoreToProps from '../../redux/mapStoreToProps';

//material UI styles
const styles = theme => ({
  container: {
    padding: '1em',
    paddingLeft: '1em',
    paddingRight: '1em',
    marginTop: '6em',
  },
  formControl: {
    width: '25%',
  },
  breadcrumbs: {
    display: 'inline-flex',
    textAlign: 'center',
  },
  futureButton: {
    fontWeight: 'bold',
    fontSize: '1.15em',
    '&:hover': {
      backgroundColor: 'rgb(240, 240, 240)',
    },
  },
  completedButton: {
    fontWeight: 'bold',
    fontSize: '1.15em',
    '&:hover': {
      backgroundColor: 'rgb(240, 240, 240)',
    },
  },
  addAdventureButton: {
    fontWeight: 'bold',
    fontSize: '1.15em',
    '&:hover': {
      backgroundColor: 'rgb(240, 240, 240)',
    },
  },
});


class DashboardPage extends Component {

  state = {
    adventureStatus: 1,
    adventureComplete: false,
    appBarHeader: 'Bucket List Dashboard',
    appBarStatus: 'dashboardOnly',
    futureStatus: true,
    completedStatus: false,
  };

  //this is making sure the dashboard view stays consistent with what type of adventure
  //was created and what the type of adventure the dropdown is currently on
  componentDidMount = () => {
    console.log('loading all adventures...');
    if (this.props.store.adventures.completeStatus === true) {
      this.setState({
        adventureStatus: 2,
        adventureComplete: true,
        futureStatus: false,
        completedStatus: true,
      })
    }
    this.fetchAdventures(); //getting adventure details for current user on page load
  }

  fetchAdventures = () => {
    this.props.dispatch({ type: 'FETCH_ADVENTURES' })
  }

  // handleAdventureStatus = (property, event) => {
  //   console.log(this.state);
  //   this.setState({
  //     [property]: event.target.value,
  //     adventureComplete: !this.state.adventureComplete
  //   })
  // }

  createAdventure = () => {
    this.props.dispatch({ type: 'SET_COMPLETE_STATUS', payload: this.state.adventureComplete });
    this.props.history.push('/create-adventure');
  }

  //nav breadcrumbs to show future or completed
  handleFuture = () => {
    console.log('HANDLE FUTURE');
    this.setState({
      adventureStatus: 1,
      adventureComplete: false,
      futureStatus: true,
      completedStatus: false,
    })
  };

  handleCompleted = () => {
    console.log('HANDLE COMPLETED');
    this.setState({
      adventureStatus: 2,
      adventureComplete: true,
      futureStatus: false,
      completedStatus: true,

    })
  };

  render() {

    const { classes } = this.props;

    return (
      <div>
        {/* <DashboardHeader /> */}
        <DashboardAppBar 
          appBarHeader={this.state.appBarHeader} 
          appBarStatus={this.state.appBarStatus} 
        />
        <div className={classes.container}>
          <div className="breadcrumbs">
            <Breadcrumbs separator="|">
              <Button size="large" onClick={this.handleFuture} 
                color={this.state.futureStatus ? 'primary' : 'blue'}
                className={classes.futureButton} >
                Future
              <ForwardOutlinedIcon />
              </Button>
              <Button size="large" onClick={this.handleCompleted} 
                color={this.state.completedStatus ? 'primary' : 'blue'}
                className={classes.completedButton}>
                Completed
              <CheckCircleOutlinedIcon />
              </Button>
              <Button size="large" 
                onClick={this.createAdventure}
                className={classes.addAdventureButton}>
                Add Adventure
              <AddCircleOutlinedIcon />
              </Button>
            </Breadcrumbs>
          </div>
          <div >
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
