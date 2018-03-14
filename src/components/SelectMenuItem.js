import React, { Component } from 'react';
import styled from 'styled-components';

const SelectMenuItemButton = styled.div`
	background: gray;
	color: ${props => props.primary ? 'red' : 'white' };
`;

class SelectMenuItem extends Component {
  render() {
    return (
      <SelectMenuItemButton {...this.props}>Test</SelectMenuItemButton>
    );
  }
}

export default SelectMenuItem;
