import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import { connect } from 'react-redux';

import { isFA, FAIcon } from '../utils/Icon';

const propTypes = {
	// Props
	icon: PropTypes.string,
	label: PropTypes.string,
	controlIcon: PropTypes.string,
	hasIcon: PropTypes.bool,
	tips: PropTypes.array,
	selectable: PropTypes.bool,
	selected: PropTypes.bool,
	editable: PropTypes.bool,

	// Event
	onClick: PropTypes.func,
};

const defaultProps = {
	icon: '',
	label: '',
	controlIcon: '',
	hasIcon: false,
	onClick() {},
};

const mapStateToProps = (state) => ({
	menuData: state,
});

const mapDispatchToProps = {
};

const SelectMenuItemContentWrapper = styled.div`
	display: -webkit-flex;
  display: -moz-flex;
  display: flex;

	> div {
		padding: 4px;
	}

	.fl-r {
		float: right;
	}
`;

const tipsItem = (tips) => {
	let tipsContent = null;
	switch (typeof tips) {
		case 'object':
			if (tips.length) {
				tipsContent = tips.map((tip, i) => {
					if (typeof tip === 'string' && isFA(tip)) {
						return FAIcon(tip, { key: i, className: 'icon'});
					}
					return (<span key={i}>{tip}</span>);
				});
			}
			break;
		default:
			tipsContent = tips && (<span>{tips}</span>) || null;
			break;
	}

	return tipsContent;
};

class SelectMenuItemContent extends Component {
	iconContent() {
		const { icon, hasIcon, selectable } = this.props;
		const needEmptyIcon = selectable ? false : hasIcon;

		return (needEmptyIcon || isFA(icon)) ? <div className="icon">{FAIcon(icon)}</div> : null;
	};

	labelContent() {
		const { label, tips } = this.props;
		return <div className={`label ${tips ? 'hasTips' : ''}`}>{label}</div>;
	};

	controlIconContent() {
		const { controlIcon } = this.props;
		return isFA(controlIcon) ? <div className="fl-r">{FAIcon(controlIcon)}</div> : null;
	};

	tipsContent() {
		const { tips } = this.props;
		return tips && <div className="fl-r tips">{tipsItem(tips)}</div>;
	};

	checkContent() {
		const { selectable, selected } = this.props;
		if (selectable) {
			return <div className="icon">{FAIcon(selected ? 'fa-check' : '')}</div>;
		}

		return null;
	};

  render() {
  	const { onClick, className } = this.props;

    return (
    	<SelectMenuItemContentWrapper onClick={onClick} className={className}>
    		{this.checkContent()}
      	{this.iconContent()}
      	{this.labelContent()}
      	{this.controlIconContent()}
      	{this.tipsContent()}
    	</SelectMenuItemContentWrapper>
    );
  }
}

SelectMenuItemContent.propTypes = propTypes;
SelectMenuItemContent.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenuItemContent);
