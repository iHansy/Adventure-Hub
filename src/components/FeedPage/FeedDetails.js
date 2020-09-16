import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Card, Grid, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import DashboardHeader from '../DashboardPage/DashboardHeader';
import DashboardAppBar from '../DashboardPage/DashboardAppBar';

//material UI styles
const styles = theme => ({
    container: {
        padding: '2em',
        marginBottom: '2em',
    },
    formControl: {
        width: '25%',
    },
    addAdventure: {
        marginTop: '.5em',
        marginLeft: '.75em',
        fontSize: '1em',
    },
    adventureCard: {
        backgroundColor: 'rgb(240, 240, 240)',
        padding: '.5em',
        height: '100%',
    },
    adventureImg: {
        height: '15em',
        width: '23em',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

class FeedDetails extends Component {

    componentDidMount() {
        this.fetchFeed(); //getting all user's activity from database
    }

    fetchFeed = () => {
        this.props.dispatch({ type: 'FETCH_FEED' });
    }

    //fine to pass id here because it's not a user id
    handleDelete = (id) => {
        console.log('deleting adventure', id)
        this.props.dispatch({ type: 'DELETE_ADVENTURE', payload: `${id}` });
    }

    //when mark complete is clicked, move adventure from future to completed
    handleMarkComplete = (id) => {
        console.log('marking adventure complete...', id);
        // move this over to markCompleteCard
        this.props.history.push(`/edit-adventure/${id}`);
        //setting markComplete reducer as true, this way the mark complete button on the
        //edit screen will conditionally render based on boolean value of markComplete reducer
        this.props.dispatch({ type: 'SET_MARK_COMPLETE', payload: true });
    }

    handleEdit = (id) => {
        console.log('EDITING ADVENTURE...', id);
        this.props.history.push(`/edit-adventure/${id}`);
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
                                    <h3>{adventure.username}</h3>
                                    <h4>{adventure.park_name}</h4>
                                    <p>{adventure.city}{adventure.city && <span>,</span>} {adventure.state}</p>
                                    <p>{adventure.date}</p>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary" >
                                        Like
                                </Button>
                                    <Button
                                        onClick={() => this.handleDetails(adventure.id)}
                                        size="small"
                                        variant="contained"
                                        color="inherit" >
                                        More Details
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
