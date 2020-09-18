import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import DashboardHeader from '../DashboardPage/DashboardHeader';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';
import ParkDetailsCard from './ParkDetailsCard';

//material UI styles
const styles = theme => ({
    container: {

    },
});

class ParkDetailsPage extends Component {

    render() {

        const { classes } = this.props;
        const headerText = 'Park Details';

        return (
            <div>
                <DashboardHeader />
                <DashboardAppBar appBarHeader={headerText} />
                <ParkDetailsCard />
            </div>
        )
    }
}

const ParkDetailsPageStyled = withStyles(styles)(ParkDetailsPage);
const ParkDetailsPageStyledRouted = withRouter(ParkDetailsPageStyled);

export default connect(mapStoreToProps)(ParkDetailsPageStyledRouted);
