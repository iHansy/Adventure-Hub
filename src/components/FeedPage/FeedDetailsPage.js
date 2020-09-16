import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import DashboardHeader from '../DashboardPage/DashboardHeader';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';
import FeedDetailsCard from './FeedDetailsCard';

//material UI styles
const styles = theme => ({
    container: {
        padding: '2em',
        marginBottom: '2em',
    },
});

class FeedDetailsPage extends Component {

    render() {

        const { classes } = this.props;
        const headerText = 'Adventure Details';

        return (
            <div>
                <DashboardHeader />
                <DashboardAppBar appBarHeader={headerText} />
                <div className={classes.container}>
                    <FeedDetailsCard />
                </div>
            </div>
        )
    }
}

const FeedDetailsPageStyled = withStyles(styles)(FeedDetailsPage);
const FeedDetailsPageStyledRouted = withRouter(FeedDetailsPageStyled);

export default connect(mapStoreToProps)(FeedDetailsPageStyledRouted);
