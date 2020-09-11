import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Card, Grid } from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class DashboardCards extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <h2>Cards go here!</h2>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(DashboardCards);
