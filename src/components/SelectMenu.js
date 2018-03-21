import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SelectMenuItem from './SelectMenuItem';

const propTypes = {
  // Props
  layer: PropTypes.number.isRequired,
};

const defaultProps = {
};

const SelectMenuContainer = styled.div`
  background: #e5e5e5;
  border: 1px solid #a0a0a0;
`;

const OptGroup = styled.div`
  border-top: 1px solid darkgray;

  &:first-child {
    border-top: none;
  }
`;

class SelectMenu extends Component {
  render() {
    const { menu, layer } = this.props;

    const hasIcon = menu.filter(group => {
      return group.items.filter(item => item.icon && item.icon.indexOf('fa-') > -1).length > 0;
    }).length > 0;

    const OptGroupContents = menu.map((group, i) => {
      const { meta, items } = group;
      const itemContents = items.map((item, j) => (
        <SelectMenuItem
          {...item}
          key={j}
          layer={layer}
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
