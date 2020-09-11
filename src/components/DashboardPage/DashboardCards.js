import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Card, Grid, Button } from '@material-ui/core';

//material UI styles
const styles = theme => ({
    container: {
        padding: '3em',
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
        width: '20em',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

class DashboardCards extends Component {

    render() {

        const { classes } = this.props;

        const adventures = this.props.store.adventures.getAdventures;
        console.log(adventures);

        return (
            <div>
                <Grid container spacing={4} className={classes.container}>
                    {this.props.store.adventures.getAdventures.map((adventure, i) => {
                        if (adventure.completed === this.props.adventureComplete) {
                            return (
                                <Grid item xs={4} key={i}>
                                    <Card className={classes.adventureCard}>
                                        <img src={adventure.image_url} alt={adventure.state} className={classes.adventureImg} />
                                        <h4>{adventure.city}, {adventure.state}</h4>
                                        <p>{adventure.date}</p>
                                        <h5>{adventure.main_activities}</h5>
                                        <p>{adventure.description}</p>
                                        <Button size="small" variant="contained">Edit</Button>
                                        <Button size="small" variant="contained" color="primary">Mark Complete</Button>
                                        <Button size="small" variant="contained" color="secondary" >Remove</Button>
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
export default connect(mapStoreToProps)(DashboardCardsStyled);
