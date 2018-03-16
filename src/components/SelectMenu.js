import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SelectMenuItem from './SelectMenuItem';

const propTypes = {
};

const defaultProps = {
};

const SelectMenuContainer = styled.div`
  background: rgba(0, 0, 0, .1);
  border: 1px solid rgba(0, 0, 0, .3);
`;

const OptGroup = styled.div`
  border-top: 1px solid darkgray;

  &:first-child {
    border-top: none;
  }
`;

class SelectMenu extends Component {
  render() {
    const { menuDatas } = this.props;

    const hasIcon = menuDatas.filter(group => {
      return group.items.filter(item => item.icon && item.icon.indexOf('fa-') > -1).length > 0;
    }).length > 0;

    const OptGroupContents = menuDatas.map((group, i) => {
      const { meta, items } = group;
      const itemContents = items.map((item, j) => (
        <SelectMenuItem
          {...item}
          key={j}
          hasIcon={hasIcon}
        />)
      );
      const addItem = meta.addable ?
        <SelectMenuItem
          icon="fa-plus"
        />
        : null;

      return (
        <OptGroup key={i}>
          {itemContents}
          {addItem}
        </OptGroup>
      );
    });

    return (
      <SelectMenuContainer>
        {OptGroupContents}
      </SelectMenuContainer>
    );
  }
}

SelectMenu.propTypes = propTypes;
SelectMenu.defaultProps = defaultProps;

export default SelectMenu;
