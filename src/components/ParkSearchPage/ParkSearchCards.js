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
    cards: {
        minHeight: '30em',
    },
    searchImg: {
        height: '20em',
        width: '100%',
    },
    itemsUnderImg: {
        textAlign: 'center',
        marginBottom: '1em',
    },  
    seeDetailsButton: {
        width: '35%',
        backgroundColor: 'rgb(216, 174, 95)',
        '&:hover': {
          backgroundColor: 'rgb(196, 150, 67)',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
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
                                <Card elevation={5} className={classes.cards}>
                                    {park.images[0] ?
                                        <img className={classes.searchImg} src={park.images[0].url} alt={park.images[0].altText} />
                                        :
                                        <div className={classes.searchImg}><i>No Image Available</i></div>
                                    }
                                    <div className={classes.itemsUnderImg}>
                                        <h3>{park.fullName}</h3>
                                        {park.addresses[1] &&
                                            <p>{park.addresses[1].city}, {park.addresses[1].stateCode}</p>
                                        }
                                        <Button
                                            className={classes.seeDetailsButton}
                                            onClick={() => this.handleSeeMore(i)}
                                            size="small"
                                            variant="contained">
                                            See Details
                                        </Button>
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

const ParkSearchCardsStyled = withStyles(styles)(ParkSearchCards);
const ParkSearchCardsStyledRouted = withRouter(ParkSearchCardsStyled);

export default connect(mapStoreToProps)(ParkSearchCardsStyledRouted);
