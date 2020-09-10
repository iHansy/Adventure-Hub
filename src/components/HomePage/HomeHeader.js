import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class HomeHeader extends Component {
    render() {
        return (
            <header className="homeHeader">
                <h1>Adventure Hub</h1>
            </header>
        );
    }
}

export default connect(mapStoreToProps)(HomeHeader);
