import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core';

//material UI styles
const styles = theme => ({
  container: {

  },
});

class ParkSearchCards extends Component {

  render() {

    const { classes } = this.props;
    let headerText = 'Find a Park';

    return (
      <div className={classes.container}>
          <h1>PARK CARDS HERE</h1>
      </div>
    );
  }
}

const ParkSearchCardsStyled = withStyles(styles)(ParkSearchCards);
export default connect(mapStoreToProps)(ParkSearchCardsStyled);
