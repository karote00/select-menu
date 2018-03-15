import React, { Component } from 'react';
import styled from 'styled-components';

import SelectMenuWrapper from './SelectMenuWrapper';
import SelectMenuButton from './SelectMenuButton';
import SelectMenuItem from './SelectMenuItem';

const SelectMenuItemButton = styled.div`
  width: 200px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  border: 2px solid rgba(0, 0, 0, 0.4);
`;

class SelectMenu extends Component {
  render() {
    return (
      <SelectMenuWrapper>
        <SelectMenuButton />
      </SelectMenuWrapper>
    );
  }
}

export default SelectMenu;
