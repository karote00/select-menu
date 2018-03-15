import React, { Component } from 'react';
import styled from 'styled-components';

import SelectMenuItem from './SelectMenuItem';

const OptGroup = styled.div`
  border-top: 1px solid darkgray;

  &:first-child {
    border-top: none;
  }
`;

class SelectMenu extends Component {
  render() {
    const { menuDatas } = this.props;
    console.warn(menuDatas)

    const OptGroupContents = menuDatas.map((group, i) => (
      <OptGroup key={i}>Group</OptGroup>
    ));

    return (
      <div>
        {OptGroupContents}
      </div>
    );
  }
}

export default SelectMenu;
