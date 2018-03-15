import React, { Component } from 'react';
import styled from 'styled-components';

const SelectMenuItemButton = styled.div`
	cursor: pointer;

	div {
		padding: 4px;
	}
`;

class SelectMenuItem extends Component {
  render() {
    return (
      <SelectMenuItemButton {...this.props}><div>{this.props.label}</div></SelectMenuItemButton>
    );
  }
}

export default SelectMenuItem;
