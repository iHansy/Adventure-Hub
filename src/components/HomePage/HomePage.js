import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Paper, Typography, Card, Grid } from '@material-ui/core';
import './HomePage.css';
// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

//material UI styles
const styles = theme => ({
  container: {
    padding: '3em',
  },
});

class HomePage extends Component {
  state = {
    heading: 'Class Component',

  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {

    const { classes } = this.props;

    return (
      <div>


        <header className="homeHeader">
          <h1>Adventure Hub</h1>
        </header>
        <Grid container className={classes.container}>
          <Grid item xs={6}>
            <Card>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra
              lacus ut ex molestie blandit. Etiam et turpis sit amet risus
              mollis interdum. Suspendisse et justo vitae metus bibendum
              fringilla sed sed justo. Aliquam sollicitudin dapibus lectus,
              vitae consequat odio elementum eget. Praesent efficitur eros vitae
              nunc interdum, eu interdum justo facilisis. Sed pulvinar nulla ac
              dignissim efficitur. Quisque eget eros metus. Vestibulum bibendum
              fringilla nibh a luctus. Duis a sapien metus.
                </p>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <RegisterForm />
            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={this.onLogin}>
                Login
              </button>
            </center>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const HomePageStyled = withStyles(styles)(HomePage);

export default connect(mapStoreToProps)(HomePageStyled);
