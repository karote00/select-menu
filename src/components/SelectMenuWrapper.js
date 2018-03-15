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
};

class SelectMenuWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: props.initialLabel,
    };

    this.onItemChange = this.onItemChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onItemChange(selectedItems) {
    this.setState({ label: selectedItems.join(', ').trim() });
  }

  onFocusChange(focusedItem) {
    this.setState({ focusedItem });
  }

  render() {
    const { label } = this.state;

    return (
      <div>
        <SelectMenuButton
          label={label}
          onItemChange={this.onItemChange}
        />
        <SelectMenu />
      </div>
    );
  }
}

SelectMenuWrapper.propTypes = propTypes;
SelectMenuWrapper.defaultProps = defaultProps;

export default SelectMenuWrapper;
