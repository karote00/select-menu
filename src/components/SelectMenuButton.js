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

  // Actions
  openMenu: PropTypes.func.isRequired,
};

const defaultProps = {
  // Props
  isOpen: false,

  // Actions
  openMenu() {},
};

const mapStateToProps = (state) => ({
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

  .select-button {
    display: block;
    overflow: hidden;
  }

  .label {
    float: left;
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
    const { label } = this.props;

    return (
      <SelectMenuItemButton
        role="button"
        tabIndex="-1"
        onClick={this.handleOpenSeleceMenu}
      >
        <SelectMenuItemContent className="select-button" label={label} controlIcon="fa-angle-down"/>
      </SelectMenuItemButton>
    );
  }
}

SelectMenuButton.propTypes = propTypes;
SelectMenuButton.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenuButton);
