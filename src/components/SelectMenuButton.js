import React, { Component } from 'react';
import styled from 'styled-components';

import SelectMenuWrapper from './SelectMenuWrapper';
import SelectMenuItem from './SelectMenuItem';
import SelectMenuItemContent from './SelectMenuItemContent';

const SelectMenuItemButton = styled.div`
  background: #e5e5e5;
  border-radius: 3px;
  border: 2px solid #999999;
  font-weight: bold;

  cursor: pointer;

  .select-button {
    display: block;
    overflow: hidden;
  }

  .label {
    float: left;
  }
`;

class SelectMenuButton extends Component {
  render() {
    const { label } = this.props;

    return (
      <SelectMenuItemButton>
        <SelectMenuItemContent className="select-button" label={label} controlIcon="fa-angle-down"/>
      </SelectMenuItemButton>
    );
  }
}

export default SelectMenuButton;
