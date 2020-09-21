import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Card, Grid, Button } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { withRouter } from 'react-router-dom';
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
        marginRight: '4em',
        width: '15%',
        backgroundColor: 'rgb(216, 174, 95)',
        '&:hover': {
            backgroundColor: 'rgb(196, 150, 67)',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
    },
    viewMoreButton: {
        width: '15%',
        backgroundColor: 'rgb(216, 174, 95)',
        '&:hover': {
            backgroundColor: 'rgb(196, 150, 67)',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
    },
    buttons: {
        textAlign: 'center',
    },
    spanDate: {
        float: 'right',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '.65em',
        marginRight: '1em',
    },
    username: {
        marginLeft: '2em',
    },
    itemsUnderImg: {
        marginLeft: '1em',
        marginRight: '1em',
        marginBottom: '2em',
        textAlign: 'center',
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
                                    <h2 className={classes.username}>{adventure.username}
                                        <span className={classes.spanDate}>{moment(adventure.date).format('ll')}</span>
                                    </h2>
                                    <img src={adventure.image_url} alt={adventure.state} className={classes.adventureImg} />
                                    <div className={classes.itemsUnderImg}>
                                        <h3>{adventure.park_name}</h3>
                                        {adventure.completed ? <p>Completed adventure</p> : <p>Future adventure</p>}
                                        <hr />
                                        <p className={classes.likes}>{adventure.count} likes</p>
                                        <div className={classes.buttons}>
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
                                            <Button
                                                className={classes.viewMoreButton}
                                                onClick={() => this.handleDetails(adventure.id)}
                                                size="small"
                                                variant="contained">
                                                <VisibilityIcon />
                                            </Button>
                                        </div>
                                    </div>
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
