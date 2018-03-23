import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SelectMenuWrapper from './SelectMenuWrapper';
import SelectMenuItem from './SelectMenuItem';
import SelectMenuItemContent from './SelectMenuItemContent';

import { openMenu } from '../actions';

const propTypes = {
  // Props
  isOpen: PropTypes.bool.isRequired,
  buttonAlignType: PropTypes.string,

  // Actions
  openMenu: PropTypes.func.isRequired,
};

const defaultProps = {
  // Props
  isOpen: false,
  buttonAlignType: 'between',

  // Actions
  openMenu() {},
};

const mapStateToProps = (state) => ({
  menuData: state,
});

const mapDispatchToProps = {
  openMenu,
};

const SelectMenuItemButton = styled.div`
  background: #e5e5e5;
  border-radius: 3px;
  border: 2px solid #999999;
  font-weight: bold;
  outline: none;
  cursor: pointer;

  .select-button.between-align {
    .control-icon {
      margin-left: auto;
    }
  }

  .grayed-out {
    .label {
     color: #a0a0a0;
    }
  }
`;

class SelectMenuButton extends Component {
  constructor(props) {
    super(props);

    this.handleOpenSeleceMenu = this.handleOpenSeleceMenu.bind(this);
  }

  handleOpenSeleceMenu() {
    const { isOpen } = this.props;
    this.props.openMenu(0, !isOpen);
  }

  render() {
    const { label, menuData, buttonAlignType } = this.props;
    const { selectedItems } = menuData;
    const btnOptions = {};
    // TODO: Change label with seletedItems

    if (buttonAlignType === 'icon-align') {
      btnOptions.icon = 'fa-angle-down';
    } else {
      btnOptions.controlIcon = 'fa-angle-down';
    }

    return (
      <SelectMenuItemButton
        role="button"
        tabIndex="-1"
        onClick={this.handleOpenSeleceMenu}
      >
        <SelectMenuItemContent
          className={`select-button ${selectedItems.length === 0 ? 'grayed-out' : ''} ${buttonAlignType === 'between' ? 'between-align' : ''}`}
          label={label}
          {...btnOptions}
        />
      </SelectMenuItemButton>
    );
  }
}

SelectMenuButton.propTypes = propTypes;
SelectMenuButton.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenuButton);
