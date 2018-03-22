import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SelectMenuButton from './SelectMenuButton';
import SelectMenu from './SelectMenu';

import { itemSelected, openMenu, moveFocus } from '../actions';

import '../css/SelectMenu.css';

const propTypes = {
  // Props
  layer: PropTypes.number,

  // Actions
  itemSelected: PropTypes.func.isRequired,
  openMenu: PropTypes.func.isRequired,
  moveFocus: PropTypes.func.isRequired,
};

const defaultProps = {
  // Props
  layer: 0,

  // Actions
  itemSelected() {},
  openMenu() {},
  moveFocus() {},
};

const mapStateToProps = (state) => ({
  menuData: state,
});

const mapDispatchToProps = {
  itemSelected,
  openMenu,
  moveFocus,
};

const Wrapper = styled.div`
  width: 250px;
  color: #727272;

  > div {
    outline: none;
  }

  * {
    box-sizing: border-box;
  }
`;

class SelectMenuWrapper extends Component {
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    this.mainMenu.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp(e) {
    e.preventDefault();
    e.stopPropagation();

    const { layer, menuData } = this.props;
    const { layersOpen, menus, menuItems, focusItemIdx } = menuData;
    const mainMenuIsOpen = layersOpen.indexOf(layer) > -1;

    if (mainMenuIsOpen) {
      const { keyCode } = e;
      const focusItem = menuItems[focusItemIdx];
      const subMenuIsOpen = focusItem && layersOpen.indexOf(focusItem.subMenuIdx) > -1;

      switch (keyCode) {
        case 13: // Enter
          if (!focusItem.disabled) {
            if (focusItem.subMenuIdx > 0) {
              this.props.openMenu(focusItem.subMenuIdx, !subMenuIsOpen);
            } else if (focusItem.selectable) {
              this.props.itemSelected(focusItemIdx);
            }
          }
          break;
        case 37: // Left
          break;
        case 38: // Up
          this.props.moveFocus('UP');
          break;
        case 39: // Right
          if (!focusItem) {

          } else {
            this.props.openMenu(focusItem.subMenuIdx, true);
          }
          break;
        case 40: // Down
          break;
        default:
          break;
      }
    }
  }

  render() {
    const { menuData, layer } = this.props;
    const { main, menuItems, layersOpen } = menuData;

    const menu = main.map(m => ({
      ...m,
      items: m.items.map(it => menuItems[it])
    }));
    const isOpen = layersOpen.indexOf(layer) > -1;

    return (
      <Wrapper>
        <div tabIndex="-1" ref={(mainMenu) => { this.mainMenu = mainMenu; }}>
          <SelectMenuButton
            label={menuData.buttonLabel}
            isOpen={isOpen}
          />
          <SelectMenu
            layerIdx={layer}
            layer={layer}
            menu={menu}
            isOpen={isOpen}
          />
        </div>
      </Wrapper>
    );
  }
}

SelectMenuWrapper.propTypes = propTypes;
SelectMenuWrapper.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenuWrapper);
