import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SelectMenuButton from './SelectMenuButton';
import SelectMenu from './SelectMenu';

import '../css/SelectMenu.css';

const propTypes = {
  layer: PropTypes.number,
};

const defaultProps = {
  layer: 0,
};

const mapStateToProps = (state) => ({
  menuData: state,
});

const mapDispatchToProps = {
};

const Wrapper = styled.div`
  width: 250px;
  color: #727272;
  outline: none;

  * {
    box-sizing: border-box;
  }
`;

class SelectMenuWrapper extends Component {
  render() {
    const { menuData, layer } = this.props;
    const { main, menuItems, layerOpens } = menuData;

    const menu = main.list.map(m => ({
      ...m,
      items: m.items.map(it => menuItems[it])
    }));
    const isOpen = layerOpens.indexOf(layer) > -1;

    return (
      <Wrapper tabIndex="-1">
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
      </Wrapper>
    );
  }
}

SelectMenuWrapper.propTypes = propTypes;
SelectMenuWrapper.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenuWrapper);
