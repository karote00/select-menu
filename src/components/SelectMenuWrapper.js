import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

const propTypes = {

};

const defaultProps = {

};

class SelectMenuWrapper extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

SelectMenuWrapper.propTypes = propTypes;
SelectMenuWrapper.defaultProps = defaultProps;

export default SelectMenuWrapper;
