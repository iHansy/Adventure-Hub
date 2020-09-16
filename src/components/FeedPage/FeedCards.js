import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Card, Grid, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

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

class FeedCards extends Component {

    //when more details is clicked, show details of adventure
    handleDetails = (id) => {
        console.log('EDITING ADVENTURE...', id);
        this.props.history.push(`/feed-details/${id}`);
    }

    //increase, decrease like on button
    handleLike = (id) => {
        console.log('liking or unliking adventure', id);
        // console.log(this.props.store.feed.getFeed[0].count);
        if (this.props.store.feed.getFeed[id].count === 1)
        this.props.dispatch({ type: 'ADD_LIKE', payload: id })
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid container spacing={4} className={classes.container}>
                    {this.props.store.feed.getFeed.map((adventure) => {
                        return (
                            <Grid item xs={4} key={adventure.id}>
                                <Card className={classes.adventureCard}>
                                    <img src={adventure.image_url} alt={adventure.state} className={classes.adventureImg} />
                                    {adventure.completed ? <h3>completed</h3> : <h3>future</h3>}
                                    <h3>{adventure.username}</h3>
                                    <h4>{adventure.park_name}</h4>
                                    <p>{adventure.date}</p>
                                    {this.props.store.user.id &&
                                        <Button
                                            onClick={() => this.handleLike(adventure.id)}
                                            size="small"
                                            variant="contained"
                                            color="primary" >
                                            Like
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
