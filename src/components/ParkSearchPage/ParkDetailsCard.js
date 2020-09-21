import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Card, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';

//material UI styles
const styles = theme => ({
    container: {
        padding: '2em',
        marginTop: '4em',
        marginBottom: '4em',
    },
    parkCard: {
        backgroundColor: 'rgb(240, 240, 240)',
        height: '100%',
        margin: 'auto',
        marginTop: '2em',
        width: '80%',
    },
    parkImg: {
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
        marginTop: '5em',
        marginRight: '1em',
    },
    addButton: {
        marginLeft: '12em',
        marginTop: '2em',
        backgroundColor: 'rgb(216, 174, 95)',
        '&:hover': {
          backgroundColor: 'rgb(196, 150, 67)',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
    },
});

class ParkDetailsCard extends Component {

    handleExit = () => {
        this.props.history.push('/park-search');
    }

    handleAddBucket = () => {
        this.props.history.push('/create-adventure');
        const i = this.props.match.params.id;
        let parkInput = this.props.store.parks.getParks[i]
        this.props.dispatch({ type: 'SET_PARK_INPUTS', payload: parkInput });
        this.props.dispatch({ type: 'SET_COMPLETE_STATUS', payload: false });
    }

    render() {

        const { classes } = this.props;
        const matchId = Number(this.props.match.params.id);
        console.log(matchId);

        return (
            <div className={classes.container}>
                {this.props.store.parks.getParks.map((park, i) => {
                    if (i === matchId) {
                        return (
                            <Card elevation={5} key={i} className={classes.parkCard}>
                                {park.images[0] ?
                                    <img src={park.images[0].url} alt={park.images[0].altText} className={classes.parkImg} />
                                    :
                                    <i className={classes.parkImg}>No Image Available</i>
                                }
                                <IconButton
                                    className={classes.exitButton}
                                    onClick={this.handleExit}
                                    size="small"
                                    color="inherit">
                                    <CloseIcon />
                                </IconButton>
                                <div className={classes.detailsText}>
                                    <h3>{park.fullName}</h3>
                                    {park.contacts.phoneNumbers[0].phoneNumber && <i>Phone # {park.contacts.phoneNumbers[0].phoneNumber}</i>}
                                    <br />
                                    <br />
                                    {park.addresses[1].line2 && <><i>{park.addresses[1].line2}</i><br /></>}
                                    <i>{park.addresses[1].city}, {park.addresses[1].stateCode}, {park.addresses[1].postalCode}</i>
                                    <p>{park.description}</p>
                                </div>
                                {this.props.store.user.id &&
                                    <Button
                                        onClick={this.handleAddBucket}
                                        className={classes.addButton}
                                        size="small"
                                        variant="contained">
                                        Add to Bucket List
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

const ParkDetailsCardStyled = withStyles(styles)(ParkDetailsCard);
const ParkDetailsCardStyledRouted = withRouter(ParkDetailsCardStyled);

export default connect(mapStoreToProps)(ParkDetailsCardStyledRouted);
