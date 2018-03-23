import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import OutsideClickHandler from './OutsideClickHandler';
import SelectMenuButton from './SelectMenuButton';
import SelectMenu from './SelectMenu';

import { itemSelected, openMenu, moveFocus, combinationKey } from '../actions';

import '../css/SelectMenu.css';

const propTypes = {
  // Props
  layer: PropTypes.number,

  // Actions
  itemSelected: PropTypes.func.isRequired,
  openMenu: PropTypes.func.isRequired,
  moveFocus: PropTypes.func.isRequired,
  combinationKey: PropTypes.func.isRequired,
};

const defaultProps = {
  // Props
  layer: 0,

  // Actions
  itemSelected() {},
  openMenu() {},
  moveFocus() {},
  combinationKey() {},
};

const mapStateToProps = (state) => ({
  menuData: state,
});

const mapDispatchToProps = {
  itemSelected,
  openMenu,
  moveFocus,
  combinationKey,
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

    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.combinationKeyChange = this.combinationKeyChange.bind(this);
  }

  componentDidMount() {
    this.mainMenu.addEventListener('keydown', this.handleKeyDown);
    this.mainMenu.addEventListener('keyup', this.handleKeyUp);
  }

  onOutsideClick() {
    const { menuData, layer } = this.props;
    const { main, menuItems, layersOpen, layersOpenFocusItem } = menuData;
    const isOpen = layersOpen.indexOf(layer) > -1;

    if (!isOpen) return;

    this.props.openMenu(layersOpen[0], false);
  }

  combinationKeyChange(e) {
    const { ctrlKey, metaKey } = e;
    this.props.combinationKey('ctrlKey', ctrlKey);
    this.props.combinationKey('metaKey', metaKey);
  }

  handleKeyDown(e) {
    this.combinationKeyChange(e);
  }

  handleKeyUp(e) {
    e.preventDefault();
    e.stopPropagation();

    this.combinationKeyChange(e);

    const { layer, menuData } = this.props;
    const { layersOpen, menus, menuItems, focusMenuIdx, layersOpenFocusItem } = menuData;
    const mainMenuIsOpen = layersOpen.indexOf(layer) > -1;

    if (mainMenuIsOpen) {
      const { keyCode } = e;
      const focusItemIdx = layersOpenFocusItem[focusMenuIdx];
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
          if (!focusItem) {
            this.props.moveFocus('LEFT');
          } else {
            if (layersOpen.length > 1) this.props.openMenu(layersOpen[layersOpen.length - 1], false);
          }
          break;
        case 38: // Up
          this.props.moveFocus('UP');
          break;
        case 39: // Right
          if (!focusItem) {
            this.props.moveFocus('RIGHT');
          } else {
            if (focusItem.subMenuIdx) this.props.openMenu(focusItem.subMenuIdx, true);
          }
          break;
        case 40: // Down
          this.props.moveFocus('DOWN');
          break;
        default:
          break;
      }
    }
  }

  render() {
    const { menuData, layer } = this.props;
    const { main, menuItems, layersOpen, layersOpenFocusItem } = menuData;

    const menu = main.map(m => ({
      ...m,
      items: m.items.map(it => menuItems[it])
    }));
    const isOpen = layersOpen.indexOf(layer) > -1;

    return (
      <Wrapper>
        <OutsideClickHandler onOutsideClick={this.onOutsideClick}>
          <div tabIndex="-1" style={{ outline: 'none' }} ref={(mainMenu) => { this.mainMenu = mainMenu; }}>
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
        </OutsideClickHandler>
      </Wrapper>
    );
  }
}

SelectMenuWrapper.propTypes = propTypes;
SelectMenuWrapper.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenuWrapper);
