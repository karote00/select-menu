import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SelectMenuItem from './SelectMenuItem';

import { itemEdit } from '../actions';

const propTypes = {
  // Props
  layer: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  layerIdx: PropTypes.number,

  // Actions
  itemEdit: PropTypes.func.isRequired,
};

const defaultProps = {
  // Props
  layer: 0,
  isOpen: false,
  layerIdx: 0,

  // Actions
  itemEdit() {},
};

const mapStateToProps = (state) => ({
  menuData: state,
});

const mapDispatchToProps = {
  itemEdit,
};

const SelectMenuContainer = styled.div`
  position: absolute;
  width: 100%;
  display: ${props => props.isOpen ? 'block' : 'none'};
  background: #e5e5e5;
  border: 1px solid #a0a0a0;

  // move menu
`;

const OptGroupLine = styled.div`
  border-top: 1px solid darkgray;
`;

class SelectMenu extends Component {
  constructor(props) {
    super(props);

    this.handleAddGroupItem = this.handleAddGroupItem.bind(this);
  }

  handleAddGroupItem(groupIdx, itemKey) {
    const { layer, menuData } = this.props;
    this.props.itemEdit(itemKey, true);
  }

  render() {
    const { menu, layer, isOpen, layerIdx, menuData } = this.props;
    const { menuItems } = menuData;

    const hasIcon = menu.filter(group =>
      group.items.filter(item =>
        item.icon && item.icon.indexOf('fa-') > -1 || item.selectable === true
      ).length > 0
    ).length > 0;

    const OptGroupContents = menu.map((group, i) => {
      const { meta, items } = group;
      const itemContents = items.map((item, j) => (
        <SelectMenuItem
          {...item}
          key={j}
          layerIdx={layerIdx}
          layer={layer}
          hasIcon={hasIcon}
        />)
      );

      const addNewMenuItem = meta.addable ? menuItems[meta.itemKey] : null;
      const addItem = addNewMenuItem ?
        <SelectMenuItem
          {...addNewMenuItem}
          key={addNewMenuItem.itemKey}
          layerIdx={layerIdx}
          layer={layer}
          hasIcon={hasIcon}
          onClick={() => this.handleAddGroupItem(i, addNewMenuItem.itemKey)}
        />
        : null;

      const optGroupLine = i === 0 ? null : <OptGroupLine key="1000" />;

      return [
        optGroupLine,
        itemContents,
        addItem,
      ];
    });

    return (
      <SelectMenuContainer isOpen={isOpen}>
        {OptGroupContents}
      </SelectMenuContainer>
    );
  }
}

SelectMenu.propTypes = propTypes;
SelectMenu.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenu);
