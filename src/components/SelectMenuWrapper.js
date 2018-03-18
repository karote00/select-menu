import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SelectMenuButton from './SelectMenuButton';
import SelectMenu from './SelectMenu';

import '../css/SelectMenu.css';

const propTypes = {
  focusedItem: PropTypes.string,
};

const defaultProps = {
};

const mapStateToProps = (state) => ({
  menuData: state,
});

const mapDispatchToProps = {
};

const Wrapper = styled.div`
  width: 250px;
  color: rgba(0, 0, 0, .5);
`;

class SelectMenuWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectMenuIsOpen: false,
      selectedItems: [],
    };

    this.onFocusChange = this.onFocusChange.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onFocusChange(focusedItem) {
    this.setState({ focusedItem });
  }

  onOpen() {
    this.setState({ selectMenuIsOpen: true });
  }

  onClose() {
    this.setState({ selectMenuIsOpen: false });
  }

  render() {
    const { menuData } = this.props;
    const { selectMenuIsOpen } = this.state;

    const menu = menuData.main.map(m => ({
      ...m,
      items: m.items.map(it => menuData.menuItems[it])
    }));

    return (
      <Wrapper>
        <SelectMenuButton
          label={menuData.buttonLabel}
        />
        <SelectMenu
          layer="main"
          isOpen={selectMenuIsOpen}
          menu={menu}
        />
      </Wrapper>
    );
  }
}

SelectMenuWrapper.propTypes = propTypes;
SelectMenuWrapper.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenuWrapper);
