import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class TemplateClass extends Component {
  state = {
    
  };

  render() {
    return (
      <div>
        <h2>CLASS COMPONENT</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TemplateClass);
