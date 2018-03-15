import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FA from 'react-fontawesome';

const propTypes = {
	icon: PropTypes.string,
	label: PropTypes.string,
	controlIcon: PropTypes.string,
};

const defaultProps = {
	icon: '',
	label: '',
	controlIcon: '',
};

const SelectMenuItemWrapper = styled.div`
	cursor: pointer;
	overflow: hidden;

	div {
		float: left;
		padding: 4px 8px;

		&.fl-r {
			float: right;
		}
	}
`;

class SelectMenuItem extends Component {
  render() {
  	const { icon, label, controlIcon } = this.props;
  	console.warn(controlIcon)
  	const iconContent = icon.indexOf('fa-') > -1 ? <div><FA name={icon.substr(3)} /></div> : null;
  	const labelContent = <div>{label}</div>;
  	const controlIconContent = controlIcon.indexOf('fa-') > -1 ?
  		<div className="fl-r"><FA name={controlIcon.substr(3)} /></div> : null;

    return (
      <SelectMenuItemWrapper>
      	{iconContent}
      	{labelContent}
      	{controlIconContent}
      </SelectMenuItemWrapper>
    );
  }
}

SelectMenuItem.propTypes = propTypes;
SelectMenuItem.defaultProps = defaultProps;

export default SelectMenuItem;
