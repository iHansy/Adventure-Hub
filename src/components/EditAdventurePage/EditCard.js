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
    invisibleButton: {
        // backgroundColor: 'cyan',
        width: '100%',
        height: '20px',
    },
    buttons: {
        marginTop: '1em',
    },
    cancelButton: {
        width: '25%',
        backgroundColor: 'rgb(216, 174, 95)',
        '&:hover': {
          backgroundColor: 'rgb(196, 150, 67)',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
    },
    saveButton: {
        marginLeft: '2em',
        width: '25%',
        backgroundColor: 'rgb(216, 174, 95)',
        '&:hover': {
          backgroundColor: 'rgb(196, 150, 67)',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
    },
    saveCompleteButton: {
        width: '30%',
        marginLeft: '2em',
        backgroundColor: 'rgb(216, 174, 95)',
        '&:hover': {
          backgroundColor: 'rgb(196, 150, 67)',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
    },
    invisibleButton: {
        height: '20px',
        width: '100%',
    },
})

class EditCard extends Component {

    state = {
        completed: false,
        date: '2020-09-12T05:00:00.000Z',
        id: 114,
        main_activities: 'backpacking, camping, skipping rocks',
        user_id: 70,
        image_url: 'https://linkpicture.com/q/splitrock-camping-1_1.jpg',
        park_name: 'Split Rock State Park',
        city: 'Two Harbors',
        state: 'MN',
        description: `This backpacking trip was really awesome, definitely one of my top 3 parks. I'm happy we brought a bunch of extra food. Having our campsite right next to the river was a huge plus!`,
    };

    componentDidMount() {
        const id = this.props.match.params.id
        //dispatch is temp data of adventure clicked on to use as prefilled inputs of editcard
        this.props.dispatch({ type: 'FETCH_ADVENTURE_INPUTS', payload: id })
    }

    handleInputChange = (event) => {
        console.log('EDITING', event.target.name);
        this.props.dispatch({ type: 'SET_ADVENTURE_EDITS', payload: { key: event.target.name, value: event.target.value } });
    }

    handleSave = () => {
        const checkInput = this.props.store.adventures.getAdventureInputs
        //validating that inputs are filled in
        if (checkInput.date === ''
            || checkInput.image_url === ''
            || checkInput.state === ''
            || checkInput.main_activities === ''
            || checkInput.description === '') {
            alert('Please fill in all required fields');
            return;
        }
        this.props.dispatch({ type: 'UPDATE_ADVENTURE', payload: this.props.store.adventures.getAdventureInputs });
        //setting dashboard status as true or false to display same status as when clicked edit
        this.props.dispatch({ type: 'SET_COMPLETE_STATUS', payload: this.props.store.adventures.getAdventureInputs.completed });
        //clearing saved inputs
        this.props.dispatch({ type: 'CLEAR_ADVENTURE_INPUTS', payload: {} });
        this.props.history.push('/dashboard');
    }

    handleMarkComplete = (id) => {

        const checkInput = this.props.store.adventures.getAdventureInputs
        //validating that inputs are filled in
        if (checkInput.date === ''
            || checkInput.image_url === ''
            || checkInput.state === ''
            || checkInput.main_activities === ''
            || checkInput.description === '') {
            alert('Please fill in all required fields');
            return;
        }
        //setting dashboard status as true or false to display same status as when clicked edit
        this.props.dispatch({ type: 'SET_COMPLETE_STATUS', payload: true });
        //this is updating entire adventure w/date and completed value as true
        this.props.dispatch({ type: 'UPDATE_MARK_COMPLETE', payload: this.props.store.adventures.getAdventureInputs });
        //clearing saved inputs
        this.props.dispatch({ type: 'CLEAR_ADVENTURE_INPUTS', payload: {} });
        //clearing markComplete reducer back to false so next time someone hits edit the mark complete view doesn't show
        this.props.dispatch({ type: 'SET_MARK_COMPLETE', payload: false });
        this.props.history.push('/dashboard');
    }

    handleCancel = () => {
        this.props.history.push('/dashboard');
        //clearing reducer inputs
        this.props.dispatch({ type: 'CLEAR_ADVENTURE_INPUTS', payload: {} });
        //setting dashboard reducer status as true or false to display same status as when clicked edit
        this.props.dispatch({ type: 'SET_COMPLETE_STATUS', payload: this.props.store.adventures.getAdventureInputs.completed })
        //setting markComplete reducer status as false
        this.props.dispatch({ type: 'SET_MARK_COMPLETE', payload: false });
    }

    // invisible button to fill in inputs for presentation
    handleInvisibleButton = () => {
        if (this.props.store.markComplete.markComplete) {
            console.log('INVISIBLE BUTTON', this.state);
            this.props.dispatch({ type: 'SET_ADVENTURE_INPUTS', payload: this.state });
        }
    };

    render() {

        const { classes } = this.props;
        const adventureInput = this.props.store.adventures.getAdventureInputs

        let formattedDate = adventureInput.date
        if (formattedDate) {
            console.log(formattedDate.length);
            console.log(formattedDate);
            if (formattedDate.length === 24) {
                formattedDate = formattedDate.slice(0, -14);
                console.log(formattedDate);
            }
        };

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
                                    placeholder="date (mm/dd/yyyy)"
                                    name="date"
                                    type="date"
                                    value={formattedDate}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    placeholder="image url"
                                    required
                                    variant="outlined"
                                    name="image_url"
                                    type="text"
                                    value={adventureInput.image_url}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    placeholder="park name"
                                    variant="outlined"
                                    name="park_name"
                                    type="text"
                                    value={adventureInput.park_name}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    placeholder="city"
                                    variant="outlined"
                                    name="city"
                                    type="text"
                                    value={adventureInput.city}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    placeholder="state"
                                    variant="outlined"
                                    name="state"
                                    type="text"
                                    value={adventureInput.state}
                                    required
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    placeholder="main activities"
                                    variant="outlined"
                                    name="main_activities"
                                    type="text"
                                    value={adventureInput.main_activities}
                                    required
                                    onChange={(event) => this.handleInputChange(event)}
                                    multiline={true}
                                    rows={2}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    placeholder="description"
                                    variant="outlined"
                                    name="description"
                                    type="text"
                                    value={adventureInput.description}
                                    required
                                    onChange={(event) => this.handleInputChange(event)}
                                    multiline={true}
                                    rows={5}
                                />
                            </div>
                            <div className={classes.buttons}>
                                    <Button 
                                        size="small"
                                        className={classes.cancelButton}
                                        variant="contained"
                                        onClick={this.handleCancel}>
                                        Cancel
                                    </Button>
                                    {this.props.store.markComplete.markComplete
                                        ?
                                        <Button 
                                            size="small"
                                            className={classes.saveCompleteButton} 
                                            variant="contained"
                                            onClick={this.handleMarkComplete}>
                                            Save as complete
                                        </Button>
                                        :
                                        <Button 
                                            size="small"
                                            className={classes.saveButton} 
                                            variant="contained"
                                            onClick={this.handleSave}>
                                            Save
                                        </Button>
                                    }
                            </div>
                            <div className={classes.invisibleButton} onClick={this.handleInvisibleButton}>

                             </div>
                        </form>
                    </Card>
                </Grid>
            </div>
        );
    }
}

const EditCardRouted = withRouter(EditCard)
const EditCardRoutedStyled = withStyles(styles)(EditCardRouted);
export default connect(mapStoreToProps)(EditCardRoutedStyled);