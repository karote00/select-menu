import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SelectMenuButton from './SelectMenuButton';
import SelectMenu from './SelectMenu';

import '../css/SelectMenu.css';

const propTypes = {
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
  color: #727272;

  * {
    box-sizing: border-box;
  }
`;

class SelectMenuWrapper extends Component {
  render() {
    const { menuData } = this.props;

    const menu = menuData.main.list.map(m => ({
      ...m,
      items: m.items.map(it => menuData.menuItems[it])
    }));

    return (
      <Wrapper>
        <SelectMenuButton
          label={menuData.buttonLabel}
          isOpen={menuData.main.isOpen}
        />
        <SelectMenu
          layer={0}
          menu={menu}
          isOpen={menuData.main.isOpen}
        />
      </Wrapper>
    );
  }
}

SelectMenuWrapper.propTypes = propTypes;
SelectMenuWrapper.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenuWrapper);
