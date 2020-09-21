import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Button, ButtonGroup, TextField, Grid, Card } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
    container: {
        marginTop: '4em',
        padding: '2.5em',
        width: '40em',
        margin: 'auto',
    },
    form: {
        marginTop: '1.5em',
    },
    textFields: {
        margin: '.3em',
        backgroundColor: 'white',
        borderRadius: '.5em',
        width: '75%',
    },
    createAdventureCard: {
        backgroundColor: 'rgb(240, 240, 240)',
        textAlign: 'center',
        minHeight: '22em',
        width: '100%',
    },
    buttons: {
        marginTop: '1em',
        marginBottom: '2em',
    },
    cancelButton: {
        backgroundColor: 'rgb(216, 174, 95)',
        '&:hover': {
          backgroundColor: 'rgb(196, 150, 67)',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
    },
    saveButton: {
        marginLeft: '2em',
        backgroundColor: 'rgb(216, 174, 95)',
        '&:hover': {
          backgroundColor: 'rgb(196, 150, 67)',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
    },
})

class CreateCard extends Component {

    state = {
        date: '',
        image_url: '',
        park_name: '',
        city: '',
        state: '',
        main_activities: '',
        description: '',
        //completed is a dynamic boolean depending on if user is on future adventures or completed
        completed: this.props.store.adventures.completeStatus,
    };

    componentDidMount() {
        this.checkParkInputs();
    }

    handleInputChange = (property, event) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }


    checkParkInputs = () => {
        const parkInputs = this.props.store.parks.getParkInputs;
        if (parkInputs.url) {
            this.setState({
                image_url: parkInputs.images[0].url,
                park_name: parkInputs.fullName,
                city: parkInputs.addresses[1].city,
                state: parkInputs.addresses[1].stateCode,
            })
        }
    }

    handleSave = () => {
        const state = this.state
        //validating that inputs are filled in
        if (state.date === '' || state.image_url === '' || state.state === ''
            || state.main_activities === '' || state.description === '') {
            alert('Please fill in all required fields');
            return;
        }
        this.props.dispatch({ type: 'POST_ADVENTURE', payload: this.state })
        //clearing inputs
        this.props.dispatch({ type: 'SET_PARK_INPUTS', payload: [] });
        this.setState({
            image_url: '',
            park_name: '',
            city: '',
            state: '',
            main_activities: '',
            description: '',
        })
        this.props.history.push('/dashboard');
    }

    handleCancel = () => {
        alert(`Cancel new adventure?`);
        const parkInputs = this.props.store.parks.getParkInputs;
        if (parkInputs.url) {
           this.props.history.goBack();
        } else {
            this.props.history.push('/dashboard');
        }
        //clearing parks.parkInput reducer
        this.props.dispatch({ type: 'SET_PARK_INPUTS', payload: [] });
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid item xs={12} className={classes.container}>
                    <Card className={classes.createAdventureCard}>
                        <form className={classes.form}>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    variant="outlined"
                                    placeholder="date (mm/dd/yy)"
                                    type="date"
                                    value={this.state.date}
                                    required
                                    onChange={(event) => this.handleInputChange('date', event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    label="image url"
                                    required
                                    variant="outlined"
                                    type="text"
                                    value={this.state.image_url}
                                    onChange={(event) => this.handleInputChange('image_url', event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    label="park name"
                                    variant="outlined"
                                    type="text"
                                    value={this.state.park_name}
                                    onChange={(event) => this.handleInputChange('park_name', event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    label="city"
                                    variant="outlined"
                                    type="text"
                                    value={this.state.city}
                                    onChange={(event) => this.handleInputChange('city', event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    label="state"
                                    variant="outlined"
                                    type="text"
                                    value={this.state.state}
                                    required
                                    onChange={(event) => this.handleInputChange('state', event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    label="main activities"
                                    variant="outlined"
                                    type="text"
                                    value={this.state.main_activities}
                                    required
                                    onChange={(event) => this.handleInputChange('main_activities', event)}
                                    multiline={true}
                                    rows={2}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    label="description"
                                    variant="outlined"
                                    type="text"
                                    value={this.state.description}
                                    required
                                    onChange={(event) => this.handleInputChange('description', event)}
                                    multiline={true}
                                    rows={5}
                                />
                            </div>
                            <div className={classes.buttons}>
                                    <Button 
                                        size="small"
                                        variant="contained"
                                        className={classes.cancelButton} 
                                        onClick={this.handleCancel}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        size="small"
                                        variant="contained"
                                        className={classes.saveButton} 
                                        onClick={this.handleSave}>
                                        Save
                                    </Button>
                            </div>
                        </form>
                    </Card>
                </Grid>
            </div>
        );
    }
}

const CreateCardRouted = withRouter(CreateCard)
const CreateCardRoutedStyled = withStyles(styles)(CreateCardRouted);
export default connect(mapStoreToProps)(CreateCardRoutedStyled);