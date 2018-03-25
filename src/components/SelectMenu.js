import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SelectMenuItem from './SelectMenuItem';

import { itemEdit, addItem } from '../actions';
import Input from '../utils/Input';

const propTypes = {
  // Props
  layer: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  layerIdx: PropTypes.number,
  addNewMenuItemData: PropTypes.object,

  // Actions
  itemEdit: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
};

const defaultProps = {
  // Props
  layer: 0,
  isOpen: false,
  layerIdx: 0,
  addNewMenuItemData: {
    label: 'Add Menu Item +',
    hasAddNewItemCheckedLabel: 'Add Menu Item +',
    disabled: false,
    selectable: false,
    selected: false,
    editable: true,
    edited: false,
    isFocus: false,
    isAddNewItem: true,
    disabledSelectItemControl: false,
  },
  initialLabel: 'Add Menu Item +',

  // Actions
  itemEdit() {},
  addItem() {},
};

const mapStateToProps = (state) => ({
  menuData: state,
});

const mapDispatchToProps = {
  itemEdit,
  addItem,
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

    this.state = {
      isAddMenuItemEdited: false,
      editAddItem: props.addNewMenuItemData.label,
    };

    this.handleAddGroupItemFocus = this.handleAddGroupItemFocus.bind(this);
    this.handleAddGroupItemBlur = this.handleAddGroupItemBlur.bind(this);
    this.handleAddGroupItemKeyUp = this.handleAddGroupItemKeyUp.bind(this);
    this.handleAddGroupItemChange = this.handleAddGroupItemChange.bind(this);
  }

  handleAddGroupItemFocus() {
    const { isAddMenuItemEdited } = this.state;
    this.setState({ isAddMenuItemEdited: true, editAddItem: this.props.initialLabel });
  }

  handleAddGroupItemBlur(e) {
    Input.handleInputBlur(e, () => { this.setState({ isAddMenuItemEdited: false }); });
  }

  handleAddGroupItemChange(value) {
    const { editAddItem } = this.state;
    this.setState({ editAddItem: value });
  }

  handleAddGroupItemKeyUp(e, groupIdx) {
    Input.handleInputKeyUp(e, {
      setValueFunc: () => {
        const { editAddItem } = this.state;
        this.setState({
          editAddItem: editAddItem.substr(0, editAddItem.length - 1),
        });
      },
      endEditFunc: () => {
        const { addNewMenuItemData, layer } = this.props;
        const { editAddItem } = this.state;

        this.handleAddGroupItemBlur(e);
        this.props.addItem({
            ...addNewMenuItemData,
            label: editAddItem,
            isAddNewItem: false,
          },
          this.props.layer,
          groupIdx,
        );
      },
      cancelEditFunc: () => {
        this.handleAddGroupItemBlur(e);
      },
    });
  }

  render() {
    const { menu, layer, isOpen, layerIdx, menuData, addNewMenuItemData } = this.props;
    const { isAddMenuItemEdited, editAddItem } = this.state;
    const { menuItems } = menuData;
    let firstSelectedItem = null;

    menu.forEach(group => {
      if (!firstSelectedItem) {
        group.items.forEach(item => {
          if (!firstSelectedItem && item.selected) firstSelectedItem = item;
        });
      }
    })

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

      const addItem = meta.addable ?
        <SelectMenuItem
          {...addNewMenuItemData}
          key="999"
          layerIdx={layerIdx}
          layer={layer}
          hasIcon={hasIcon}
          edited={isAddMenuItemEdited}
          enabledSelectItemControl={false}
          editInputValue={editAddItem}
          onClick={this.handleAddGroupItemFocus}
          onChange={(value) => this.handleAddGroupItemChange(value)}
          onKeyUp={(e) => this.handleAddGroupItemKeyUp(e, i)}
          onBlur={this.handleAddGroupItemBlur}
        />
        : null;

      const optGroupLine = i === 0 ? null : <OptGroupLine key="1000" />;

      return [
        optGroupLine,
        itemContents,
        addItem,
      ];
    });

    // Calculater first selected item position
    // console.warn(firstSelectedItem)

    return (
      <SelectMenuContainer style={{ transform: `translate()` }} isOpen={isOpen}>
        {OptGroupContents}
      </SelectMenuContainer>
    );
  }
}

SelectMenu.propTypes = propTypes;
SelectMenu.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenu);
