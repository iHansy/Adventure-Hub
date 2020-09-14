import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Button, ButtonGroup, TextField, Grid, Card } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
    container: {
        marginTop: '2em',
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
    btnGroup: {
        margin: '2em',
        backgroundColor: 'rgb(216, 174, 95)',
    },
    createAdventureCard: {
        backgroundColor: 'rgb(240, 240, 240)',
        textAlign: 'center',
        minHeight: '22em',
        width: '100%',
    },
})

class EditCard extends Component {

    componentDidMount() {
        const id = this.props.match.params.id
        //dispatch is temp data of adventure clicked on to use as prefilled inputs of editcard
        this.props.dispatch ({ type: 'FETCH_ADVENTURE_INPUTS',  payload: id })
    }

    handleInputChange = (event) => {
        console.log('EDITING', event.target.name);
        this.props.dispatch({ type: 'SET_ADVENTURE_EDITS', payload: { key: event.target.name, value: event.target.value} });
    }

    handleSave = () => {
        const checkInput = this.props.store.adventures.getAdventureInputs
        //validating that inputs are filled in
        if (checkInput.image_url === '' 
        || checkInput.state === '' 
        || checkInput.main_activities === '' 
        || checkInput.description === '') {
            alert('Please fill in all required fields');
            return;
        }
        this.props.dispatch({ type: 'UPDATE_ADVENTURE', payload: this.props.store.adventures.getAdventureInputs });
        //setting dashboard status as true or false to display same status as when clicked edit
        this.props.dispatch({ type: 'SET_COMPLETE_STATUS', payload: this.props.store.adventures.getAdventureInputs.completed});
        //clearing saved inputs
        this.props.dispatch({ type: 'CLEAR_ADVENTURE_INPUTS', payload: {} });
        this.props.history.push('/dashboard');
    }

    handleCancel = () => {
        this.props.history.push('/dashboard');
        //clearing reducer inputs
        this.props.dispatch({ type: 'CLEAR_ADVENTURE_INPUTS', payload: {} });
        //setting dashboard reducer status as true or false to display same status as when clicked edit
        this.props.dispatch({ type: 'SET_COMPLETE_STATUS', payload: this.props.store.adventures.getAdventureInputs.completed})
        //setting markComplete reducer status as false
        this.props.dispatch({ type: 'SET_MARK_COMPLETE' , payload: false });
    }

    render() {

        const { classes } = this.props;
        const adventureInput = this.props.store.adventures.getAdventureInputs

        return (
            <div>
                <Grid item xs={12} className={classes.container}>
                    <Card className={classes.createAdventureCard}>
                        <form className={classes.form}>
                            <div>
                                {/* <img src={adventure.image_url} alt={adventure.state} className={classes.adventureImg} /> */}
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    variant="outlined"
                                    placeholder="image url"
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
                                    variant="outlined"
                                    placeholder="park name (optional)"
                                    name="park_name"
                                    type="text"
                                    value={adventureInput.park_name}
                                    required
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    variant="outlined"
                                    placeholder="city (optional)"
                                    name="city"
                                    type="text"
                                    value={adventureInput.city}
                                    required
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    variant="outlined"
                                    placeholder="state"
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
                                    variant="outlined"
                                    placeholder="main activities"
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
                                    variant="outlined"
                                    placeholder="description"
                                    name="description"
                                    type="text"
                                    value={adventureInput.description}
                                    required
                                    onChange={(event) => this.handleInputChange(event)}
                                    multiline={true}
                                    rows={5}
                                />
                            </div>
                            <div>
                                <ButtonGroup className={classes.btnGroup}>
                                    <Button className={classes.btnSingle} onClick={this.handleCancel}>
                                        Cancel
                                    </Button>
                                    {this.props.store.markComplete.markComplete ? <Button className={classes.btnSingle} onClick={this.handleSave}>
                                        Mark Complete
                                    </Button> :  <Button className={classes.btnSingle} onClick={this.handleSave}>
                                        Save
                                    </Button>}
                                </ButtonGroup>
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