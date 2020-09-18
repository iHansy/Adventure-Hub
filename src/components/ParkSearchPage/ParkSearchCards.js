import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Button, Grid, Card } from '@material-ui/core';

//material UI styles
const styles = theme => ({
    container: {
        marginTop: '2em',
    },
});

class ParkSearchCards extends Component {

    handleSeeMore = (i) => {
        console.log('VIEWING DETAILS OF PARK', i);
        this.props.history.push(`park-search-details/${i}`)
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <Grid container spacing={4}>
                    {this.props.store.parks.getParks.map((park, i) => {
                        return (
                            <Grid item xs={4} key={i}>
                                <Card elevation={5} >
                                    {park.images[0] ?
                                        <img src={park.images[0].url} alt={park.images[0].altText} /> 
                                        : 
                                        <i>No Image Available</i>
                                    }
                                    <h3>{park.fullName}</h3>
                                    {park.addresses[1] &&
                                        <p>{park.addresses[1].city}, {park.addresses[1].stateCode}</p>
                                    }
                                    <Button
                                        onClick={() => this.handleSeeMore(i)}
                                        size="small"
                                        variant="contained"
                                        color="inherit" >
                                        See More
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

const ParkSearchCardsStyled = withStyles(styles)(ParkSearchCards);
const ParkSearchCardsStyledRouted = withRouter(ParkSearchCardsStyled);

export default connect(mapStoreToProps)(ParkSearchCardsStyledRouted);
