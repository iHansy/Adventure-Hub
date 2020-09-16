import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Card, Grid, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import DashboardHeader from '../DashboardPage/DashboardHeader';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';

//material UI styles
const styles = theme => ({
    adventureCard: {
        backgroundColor: 'rgb(240, 240, 240)',
        height: '100%',
        margin: 'auto',
        marginTop: '2em',
        width: '70%',
    },
    adventureImg: {
        height: '30em',
        width: '40em',
        float: 'left',
        marginRight: '5em',
    },
    exitButton: {
        float: 'right',
        margin: '1em',
    }
});

class FeedDetails extends Component {

    componentDidMount() {
        this.fetchFeed(); //getting all user's activity from database
    }

    fetchFeed = () => {
        this.props.dispatch({ type: 'FETCH_FEED' });
    }
    
    handleExit = () => {
        this.props.history.push('/feed');
    }

    render() {

        const { classes } = this.props;

        //this is being compared below in the if statement to only show details
        //for adventure clicked on
        const matchId = this.props.match.params.id;

        const headerText = 'User Feed';

        return (
            <div>
                <DashboardHeader />
                <DashboardAppBar appBarHeader={headerText} />
                <div>
                    {this.props.store.feed.getFeed.map((adventure) => {
                        if (adventure.id == matchId) {
                            return (
                                <Card className={classes.adventureCard}>
                                    <img src={adventure.image_url} alt={adventure.park_name} className={classes.adventureImg} />
                                        <Button
                                            className={classes.exitButton}
                                            onClick={this.handleExit}
                                            size="small"
                                            variant="contained"
                                            color="inherit">
                                            X
                                        </Button>
                                        <h3>{adventure.username}</h3>
                                        <h4>{adventure.park_name}</h4>
                                        <p>{adventure.city}{adventure.city && <span>,</span>} {adventure.state}</p>
                                        <p>{adventure.date}</p>
                                        <p>{adventure.main_activities}</p>
                                        <p>{adventure.description}</p>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary">
                                        Like
                                    </Button>
                                </Card>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
}

const FeedDetailsStyled = withStyles(styles)(FeedDetails);
const FeedDetailsStyledRouted = withRouter(FeedDetailsStyled);

export default connect(mapStoreToProps)(FeedDetailsStyledRouted);
