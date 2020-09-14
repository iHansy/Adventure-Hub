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

class CreateCard extends Component {

    state = {
        image_url: '',
        park_name: '',
        city: '',
        state: '',
        main_activities: '',
        description: '',
        //completed is a dynamic boolean depending on if user is on future adventures or completed
        completed: this.props.store.adventures.completeStatus,
    };

    handleInputChange = (property, event) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    handleSave = () => {
        const state = this.state
        //validating that inputs are filled in
        if (state.image_url === '' || state.state === '' || state.main_activities === '' || state.description === '') {
            alert('Please fill in all required fields');
            return;
        }
        this.props.dispatch({ type: 'POST_ADVENTURE', payload: this.state })
        //clearing inputs
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
        this.props.history.push('/dashboard');
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
                                    placeholder="image url"
                                    type="text"
                                    value={this.state.image_url}
                                    required
                                    onChange={(event) => this.handleInputChange('image_url', event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    variant="outlined"
                                    placeholder="park name (optional)"
                                    type="text"
                                    value={this.state.park_name}
                                    required
                                    onChange={(event) => this.handleInputChange('park_name', event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    variant="outlined"
                                    placeholder="city (optional)"
                                    type="text"
                                    value={this.state.city}
                                    required
                                    onChange={(event) => this.handleInputChange('city', event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textFields}
                                    size="small"
                                    variant="outlined"
                                    placeholder="state"
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
                                    variant="outlined"
                                    placeholder="main activities"
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
                                    variant="outlined"
                                    placeholder="description"
                                    type="text"
                                    value={this.state.description}
                                    required
                                    onChange={(event) => this.handleInputChange('description', event)}
                                    multiline={true}
                                    rows={5}
                                />
                            </div>
                            <div>
                                <ButtonGroup className={classes.btnGroup}>
                                    <Button className={classes.btnSingle} onClick={this.handleCancel}>
                                        Cancel
                                    </Button>
                                    <Button className={classes.btnSingle} onClick={this.handleSave}>
                                        Save
                                    </Button>
                                </ButtonGroup>
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