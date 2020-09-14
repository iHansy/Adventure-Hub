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

class DashboardCards extends Component {

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

        return (
            <div>
                <Grid container spacing={4} className={classes.container}>
                    {this.props.store.adventures.getAllAdventures.map((adventure, i) => {
                        if (adventure.completed === this.props.adventureComplete) {
                            return (
                                <Grid item xs={4} key={i}>
                                    <Card className={classes.adventureCard}>
                                        <img src={adventure.image_url} alt={adventure.state} className={classes.adventureImg} />
                                        <h4>{adventure.park_name}</h4>
                                        <p>{adventure.city}{adventure.city && <span>,</span>} {adventure.state}</p>
                                        <p>{adventure.date}</p>
                                        <h5>{adventure.main_activities}</h5>
                                        <p>{adventure.description}</p>
                                        <Button
                                            size="small" 
                                            variant="contained"
                                            onClick={() => this.handleEdit(adventure.id)}>
                                            Edit
                                        </Button>
                                        {!this.props.adventureComplete &&
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                onClick={() => this.handleMarkComplete(adventure.id)}>
                                                Mark Complete
                                            </Button>
                                        }
                                        <Button
                                            onClick={() => this.handleDelete(adventure.id)}
                                            size="small"
                                            variant="contained"
                                            color="secondary" >
                                            Remove
                                        </Button>
                                    </Card>
                                </Grid>
                            )
                        }
                    })}
                </Grid>
            </div>
        );
    }
}

const DashboardCardsStyled = withStyles(styles)(DashboardCards);
const DashboardCardsStyledRouted = withRouter(DashboardCardsStyled);

export default connect(mapStoreToProps)(DashboardCardsStyledRouted);
