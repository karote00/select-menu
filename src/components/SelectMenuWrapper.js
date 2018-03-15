import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SelectMenuButton from './SelectMenuButton';
import SelectMenu from './SelectMenu';

import '../css/SelectMenu.css';

const propTypes = {
  focusedItem: PropTypes.string,
};

const defaultProps = {
  initialLabel: null,

  menuDatas: [
    {
      meta: {
        addable: false,
      },
      items: [
        { icon: 'fa-rocket', label: 'rocket', tips: [100, 200, 'fa-mobile'] },
        { label: 'smiley', disabled: true },
      ]
    },
    {
      meta: {
        addable: false,
      },
      items: [
        { icon: 'fa-rocket', label: 'rocket', tips: [10, 20, 'fa-car'] },
        { icon: 'fa-play', label: 'play', tips: ['fa-mobile'] },
        { label: 'America', editabled: true },
      ]
    }
  ],
};

const Wrapper = styled.div`
  width: 200px;
  color: rgba(0, 0, 0, .5);
`;

class SelectMenuWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: props.initialLabel,
      selectMenuIsOpen: false,
      selectedItems: [],
    };

    this.onItemChange = this.onItemChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onItemChange(selectedItem) {
    const { selectedItems } = this.state;

    if (selectedItems.indexOf(selectedItem) === -1) selectedItems.push(selectedItem);

    this.setState({
      selectedItems,
      label: selectedItems.join(', ').trim(),
    });
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
    const { menuDatas } = this.props;
    const { label, selectMenuIsOpen } = this.state;

    return (
      <Wrapper>
        <SelectMenuButton
          label={label}
        />
        <SelectMenu
          isOpen={selectMenuIsOpen}
          menuDatas={menuDatas}
          onItemChange={this.onItemChange}
        />
      </Wrapper>
    );
  }
}

SelectMenuWrapper.propTypes = propTypes;
SelectMenuWrapper.defaultProps = defaultProps;

export default SelectMenuWrapper;
