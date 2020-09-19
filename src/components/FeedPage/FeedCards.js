import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Card, Grid, Button } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';import { withRouter } from 'react-router-dom';
import moment from 'moment';

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
        width: '100%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    likeButton: {
        marginTop: '1em',
        width: '30%',
        backgroundColor: 'rgb(216, 174, 95)',
        '&:hover': {
            backgroundColor: 'rgb(196, 150, 67)',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
    },
    likeButtonFalse: {
    },
});

class FeedCards extends Component {

    state = {
        testStatus: true,
    }

    //when more details is clicked, show details of adventure
    handleDetails = (id) => {
        console.log('EDITING ADVENTURE...', id);
        this.props.history.push(`/feed-details/${id}`);
    }

    //increase, decrease like on button
    handleLike = (id) => {
        console.log('liking or unliking adventure', id);
        //sql code is liking or unliking if like already exists
        this.props.dispatch({ type: 'PUT_LIKE', payload: id })
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid container spacing={4} className={classes.container}>
                    {this.props.store.feed.getFeed.map((adventure) => {
                        return (
                            <Grid item xs={4} key={adventure.id}>
                                <Card elevation={5} className={classes.adventureCard}>
                                    <img src={adventure.image_url} alt={adventure.state} className={classes.adventureImg} />
                                    {adventure.completed ? <h3>completed</h3> : <h3>future</h3>}
                                    <h3>{adventure.username}</h3>
                                    <h4>{adventure.park_name}</h4>
                                    <p>{moment(adventure.date).format('ll')}</p>
                                    {this.props.store.user.id &&
                                        <Button
                                        onClick={() => this.handleLike(adventure.id)}
                                        size="small"
                                        variant="contained"
                                        // color="primary"
                                        className={classes.likeButton}>
                                        <ThumbUpOutlinedIcon/>
                                        </Button>
                                    }
                                    <p>{adventure.count} likes</p>
                                    <Button
                                        onClick={() => this.handleDetails(adventure.id)}
                                        size="small"
                                        variant="contained"
                                        color="inherit" >
                                        More Details
                                        </Button>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        );
    }
}

const FeedCardsStyled = withStyles(styles)(FeedCards);
const FeedCardsStyledRouted = withRouter(FeedCardsStyled);

export default connect(mapStoreToProps)(FeedCardsStyledRouted);
