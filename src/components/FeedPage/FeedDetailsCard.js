import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Card, Button, IconButton } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import CloseIcon from '@material-ui/icons/Close';
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
        marginRight: '1em',
        marginTop: '.5em',
        '&:hover': {
            backgroundColor: 'rgb(216, 174, 95)',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
    },
    detailsText: {
        textAlign: 'left',
        marginTop: '2em',
        marginRight: '1em',
    },
    likeButton: {
        marginLeft: '9em',
        width: '10%',
        backgroundColor: 'rgb(216, 174, 95)',
        '&:hover': {
            backgroundColor: 'rgb(196, 150, 67)',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
    },
    likesCount: {
        textAlign: 'center',
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

     //increase, decrease like on button
     handleLike = (id) => {
        console.log('liking or unliking adventure', id);
        //sql code is liking or unliking if like already exists
        this.props.dispatch({ type: 'PUT_LIKE', payload: id })
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
                                <IconButton
                                    className={classes.exitButton}
                                    onClick={this.handleExit}
                                    size="small"
                                    color="inherit">
                                    <CloseIcon/>
                                </IconButton>
                                <div className={classes.detailsText}>
                                    <h2>{adventure.username}</h2>
                                    <h4>{adventure.park_name}</h4>
                                    <p>{adventure.city}{adventure.city && <span>,</span>} {adventure.state}</p>
                                    <p>{moment(adventure.date).format('ll')}</p>
                                    <p>{adventure.main_activities}</p>
                                    <p>{adventure.description}</p>
                                    <hr />
                                    <p className={classes.likesCount}>{adventure.count} likes</p>
                                </div>
                                {this.props.store.user.id &&
                                    <Button
                                        onClick={() => this.handleLike(adventure.id)}
                                        size="small"
                                        variant="contained"
                                        // color="primary"
                                        className={classes.likeButton}>
                                        <ThumbUpOutlinedIcon />
                                    </Button>
                                }
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
