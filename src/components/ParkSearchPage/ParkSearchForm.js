import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import SearchIcon from '@material-ui/icons/Search';
import ParkSearchCards from './ParkSearchCards';
import { withStyles, Grid, Card, InputLabel, Select, MenuItem, FormControl, Button, Paper } from '@material-ui/core';

//material UI styles
const styles = theme => ({
    container: {
        padding: '2em',
    },
    formCard: {
        backgroundColor: 'rgb(240, 240, 240)',
        height: '4.5em',
        width: '50%',
        margin: 'auto',
    },
    formControl: {
        textAlign: 'center',
        marginTop: '.1em',
    },
    submitButton: {
        marginTop: '1em',
        marginLeft: '5em',
        width: '8em',
        backgroundColor: 'rgb(216, 174, 95)',
        '&:hover': {
          backgroundColor: 'rgb(196, 150, 67)',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
    },
    menuItem: {
        '&:hover': {
            backgroundColor: 'rgb(196, 150, 67)',
            borderColor: '#0062cc',
            boxShadow: 'none',
          },
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
                <Card className={classes.formCard} elevation={5}>
                    <div className={classes.formControl}>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Select a state</InputLabel>
                            <Select
                                className={classes.selectInput}
                                style={{ minWidth: "10em" }}
                                value={this.state.parkState}
                                onChange={(event) => this.handleParkState(event)}
                            >
                                <MenuItem value="AL" className={classes.menuItem}>Alabama</MenuItem>
                                <MenuItem value="AK" className={classes.menuItem}>Alaska</MenuItem>
                                <MenuItem value="AZ" className={classes.menuItem}>Arizona</MenuItem>
                                <MenuItem value="AR" className={classes.menuItem}>Arkansas</MenuItem>
                                <MenuItem value="CA" className={classes.menuItem}>California</MenuItem>
                                <MenuItem value="CO" className={classes.menuItem}>Colorado</MenuItem>
                                <MenuItem value="CT" className={classes.menuItem}>Connecticut</MenuItem>
                                <MenuItem value="DE" className={classes.menuItem}>Delaware</MenuItem>
                                <MenuItem value="FL" className={classes.menuItem}>Florida</MenuItem>
                                <MenuItem value="GA" className={classes.menuItem}>Georgia</MenuItem>
                                <MenuItem value="HI" className={classes.menuItem}>Hawaii</MenuItem>
                                <MenuItem value="ID" className={classes.menuItem}>Idaho</MenuItem>
                                <MenuItem value="IL" className={classes.menuItem}>Illinois</MenuItem>
                                <MenuItem value="IN" className={classes.menuItem}>Indiana</MenuItem>
                                <MenuItem value="IA" className={classes.menuItem}>Iowa</MenuItem>
                                <MenuItem value="KS" className={classes.menuItem}>Kansas</MenuItem>
                                <MenuItem value="KY" className={classes.menuItem}>Kentucky</MenuItem>
                                <MenuItem value="LA" className={classes.menuItem}>Louisiana</MenuItem>
                                <MenuItem value="ME" className={classes.menuItem}>Maine</MenuItem>
                                <MenuItem value="MD" className={classes.menuItem}>Maryland</MenuItem>
                                <MenuItem value="MA" className={classes.menuItem}>Massachusetts</MenuItem>
                                <MenuItem value="MI" className={classes.menuItem}>Michigan</MenuItem>
                                <MenuItem value="MN" className={classes.menuItem}>Minnesota</MenuItem>
                                <MenuItem value="MS" className={classes.menuItem}>Mississippi</MenuItem>
                                <MenuItem value="MO" className={classes.menuItem}>Missouri</MenuItem>
                                <MenuItem value="MT" className={classes.menuItem}>Montana</MenuItem>
                                <MenuItem value="NE" className={classes.menuItem}>Nebraska</MenuItem>
                                <MenuItem value="NV" className={classes.menuItem}>Nevada</MenuItem>
                                <MenuItem value="NH" className={classes.menuItem}>New Hampshire</MenuItem>
                                <MenuItem value="NJ" className={classes.menuItem}>New Jersey</MenuItem>
                                <MenuItem value="NM" className={classes.menuItem}>New Mexico</MenuItem>
                                <MenuItem value="NY" className={classes.menuItem}>New York</MenuItem>
                                <MenuItem value="NC" className={classes.menuItem}>North Carolina</MenuItem>
                                <MenuItem value="ND" className={classes.menuItem}>North Dakota</MenuItem>
                                <MenuItem value="OH" className={classes.menuItem}>Ohio</MenuItem>
                                <MenuItem value="OK" className={classes.menuItem}>Oklahoma</MenuItem>
                                <MenuItem value="OR" className={classes.menuItem}>Oregon</MenuItem>
                                <MenuItem value="PA" className={classes.menuItem}>Pennsylvania</MenuItem>
                                <MenuItem value="RI" className={classes.menuItem}>Rhode Island</MenuItem>
                                <MenuItem value="SC" className={classes.menuItem}>South Carolina</MenuItem>
                                <MenuItem value="SD" className={classes.menuItem}>South Dakota</MenuItem>
                                <MenuItem value="TN" className={classes.menuItem}>Tennessee</MenuItem>
                                <MenuItem value="TX" className={classes.menuItem}>Texas</MenuItem>
                                <MenuItem value="UT" className={classes.menuItem}>Utah</MenuItem>
                                <MenuItem value="VT" className={classes.menuItem}>Vermont</MenuItem>
                                <MenuItem value="VA" className={classes.menuItem}>Virginia</MenuItem>
                                <MenuItem value="WA" className={classes.menuItem}>Washington</MenuItem>
                                <MenuItem value="WV" className={classes.menuItem}>West Virginia</MenuItem>
                                <MenuItem value="WI" className={classes.menuItem}>Wisconsin</MenuItem>
                                <MenuItem value="WY" className={classes.menuItem}>Wyoming</MenuItem>
                            </Select>
                        </FormControl>
                        <Button 
                                size="small"
                                variant="contained"
                                onClick={this.handleSubmit}
                                className={classes.submitButton}>
                                Search
                                <SearchIcon/>
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }
}

const ParkSearchFormStyled = withStyles(styles)(ParkSearchForm);
export default connect(mapStoreToProps)(ParkSearchFormStyled);
