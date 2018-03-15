import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FA from 'react-fontawesome';

const propTypes = {
	icon: PropTypes.string,
	label: PropTypes.string,
	controlIcon: PropTypes.string,
	hasIcon: PropTypes.bool,
};

const defaultProps = {
	icon: '',
	label: '',
	controlIcon: '',
	hasIcon: false,
};

const SelectMenuItemWrapper = styled.div`
	cursor: pointer;
	overflow: hidden;
`;

const SelectMenuItemContentWrapper = styled.div`
	div {
		float: left;
		padding: 4px 8px;

		&.fl-r {
			float: right;
		}

		&.icon {
			width: 1.6em;
			padding: 4px 0;
			text-align: center;
		}
	}
`;

class SelectMenuItem extends Component {
  render() {
  	const { icon, label, controlIcon, hasIcon } = this.props;

  	const iconContent = (hasIcon || icon.indexOf('fa-') > -1) ? <div className="icon"><FA name={icon.substr(3)} /></div> : null;
  	const labelContent = <div>{label}</div>;
  	const controlIconContent = controlIcon.indexOf('fa-') > -1 ?
  		<div className="fl-r"><FA name={controlIcon.substr(3)} /></div> : null;

    return (
      <SelectMenuItemWrapper>
      	<SelectMenuItemContentWrapper>
	      	{iconContent}
	      	{labelContent}
	      	{controlIconContent}
	      </SelectMenuItemContentWrapper>
      </SelectMenuItemWrapper>
    );
  }
}

SelectMenuItem.propTypes = propTypes;
SelectMenuItem.defaultProps = defaultProps;

export default SelectMenuItem;
