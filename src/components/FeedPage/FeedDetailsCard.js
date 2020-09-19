import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Card, Grid, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

//material UI styles
const styles = theme => ({
    container: {
        padding: '2em',
        marginBottom: '2em',
    },
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
        marginRight: '2em',
    },
    exitButton: {
        float: 'right',
        margin: '1em',
    },
    detailsText: {
        textAlign: 'left',
        marginTop: '2em',
        marginRight: '1em',
    },
    likeButton: {
        marginLeft: '10em',
    },
});

class FeedDetailsPage extends Component {

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
        const matchId = Number(this.props.match.params.id);

        return (
            <div>
                    {this.props.store.feed.getFeed.map((adventure) => {
                        if (adventure.id === matchId) {
                            return (
                                    <Card elevation={5} className={classes.adventureCard} key={adventure.id}>
                                        <img src={adventure.image_url} alt={adventure.park_name} className={classes.adventureImg} />
                                        <Button
                                            className={classes.exitButton}
                                            onClick={this.handleExit}
                                            size="small"
                                            variant="contained"
                                            color="inherit">
                                            X
                                        </Button>
                                        <div className={classes.detailsText}>
                                            <h2>{adventure.username}</h2>
                                            <h4>{adventure.park_name}</h4>
                                            <p>{adventure.city}{adventure.city && <span>,</span>} {adventure.state}</p>
                                            <p>{moment(adventure.date).format('ll')}</p>
                                            <p>{adventure.main_activities}</p>
                                            <p>{adventure.description}</p>
                                        </div>
                                        <Button
                                            className={classes.likeButton}
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
        )
    }
}

const FeedDetailsPageStyled = withStyles(styles)(FeedDetailsPage);
const FeedDetailsPageStyledRouted = withRouter(FeedDetailsPageStyled);

export default connect(mapStoreToProps)(FeedDetailsPageStyledRouted);
