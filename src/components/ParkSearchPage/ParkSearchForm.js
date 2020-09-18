import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ParkSearchCards from './ParkSearchCards';
import { withStyles, Grid, Card, InputLabel, Select, MenuItem, FormControl, Button } from '@material-ui/core';

//material UI styles
const styles = theme => ({
    container: {
    },
});

class ParkSearchForm extends Component {

    //search query goes in state, it's dynamic
    state = {
        parkState: ''
    }

    handleParkState = (event) => {
        this.setState({
            parkState: event.target.value
        })
        console.log(this.state.parkState);
    }

    handleSubmit = () => {
        if (this.state.parkState === '') {
            alert('Please choose a state before submitting.');
            return;
        }
        console.log(this.state);

        this.props.dispatch({ type: 'FETCH_PARKS', payload: this.state.parkState });
        //clearing input
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <h1>NPS SEARCH</h1>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                        style={{ minWidth: "10em" }}
                        value={this.state.parkState}
                        onChange={(event) => this.handleParkState(event)}
                    >
                        <MenuItem value="AL">Alabama</MenuItem>
                        <MenuItem value="AK">Alaska</MenuItem>
                        <MenuItem value="AZ">Arizona</MenuItem>
                        <MenuItem value="AR">Arkansas</MenuItem>
                        <MenuItem value="CA">California</MenuItem>
                        <MenuItem value="CO">Colorado</MenuItem>
                        <MenuItem value="CT">Connecticut</MenuItem>
                        <MenuItem value="DE">Delaware</MenuItem>
                        <MenuItem value="FL">Florida</MenuItem>
                        <MenuItem value="GA">Georgia</MenuItem>
                        <MenuItem value="HI">Hawaii</MenuItem>
                        <MenuItem value="ID">Idaho</MenuItem>
                        <MenuItem value="IL">Illinois</MenuItem>
                        <MenuItem value="IN">Indiana</MenuItem>
                        <MenuItem value="IA">Iowa</MenuItem>
                        <MenuItem value="KS">Kansas</MenuItem>
                        <MenuItem value="KY">Kentucky</MenuItem>
                        <MenuItem value="LA">Louisiana</MenuItem>
                        <MenuItem value="ME">Maine</MenuItem>
                        <MenuItem value="MD">Maryland</MenuItem>
                        <MenuItem value="MA">Massachusetts</MenuItem>
                        <MenuItem value="MI">Michigan</MenuItem>
                        <MenuItem value="MN">Minnesota</MenuItem>
                        <MenuItem value="MS">Mississippi</MenuItem>
                        <MenuItem value="MO">Missouri</MenuItem>
                        <MenuItem value="MT">Montana</MenuItem>
                        <MenuItem value="NE">Nebraska</MenuItem>
                        <MenuItem value="NV">Nevada</MenuItem>
                        <MenuItem value="NH">New Hampshire</MenuItem>
                        <MenuItem value="NJ">New Jersey</MenuItem>
                        <MenuItem value="NM">New Mexico</MenuItem>
                        <MenuItem value="NY">New York</MenuItem>
                        <MenuItem value="NC">North Carolina</MenuItem>
                        <MenuItem value="ND">North Dakota</MenuItem>
                        <MenuItem value="OH">Ohio</MenuItem>
                        <MenuItem value="OK">Oklahoma</MenuItem>
                        <MenuItem value="OR">Oregon</MenuItem>
                        <MenuItem value="PA">Pennsylvania</MenuItem>
                        <MenuItem value="RI">Rhode Island</MenuItem>
                        <MenuItem value="SC">South Carolina</MenuItem>
                        <MenuItem value="SD">South Dakota</MenuItem>
                        <MenuItem value="TN">Tennessee</MenuItem>
                        <MenuItem value="TX">Texas</MenuItem>
                        <MenuItem value="UT">Utah</MenuItem>
                        <MenuItem value="VT">Vermont</MenuItem>
                        <MenuItem value="VA">Virginia</MenuItem>
                        <MenuItem value="WA">Washington</MenuItem>
                        <MenuItem value="WV">West Virginia</MenuItem>
                        <MenuItem value="WI">Wisconsin</MenuItem>
                        <MenuItem value="WY">Wyoming</MenuItem>
                    </Select>
                </FormControl>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

const ParkSearchFormStyled = withStyles(styles)(ParkSearchForm);
export default connect(mapStoreToProps)(ParkSearchFormStyled);
