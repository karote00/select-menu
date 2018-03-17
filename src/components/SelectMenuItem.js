import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import { connect } from 'react-redux';

import { itemSelected, itemCanceled } from '../actions';
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

	// Actions
	itemSelected: PropTypes.func.isRequired,
	itemCanceled: PropTypes.func.isRequired,
};

const defaultProps = {
	icon: '',
	label: '',
	controlIcon: '',
	hasIcon: false,
};

const mapStateToProps = (state) => ({
	menuData: state,
});

const mapDispatchToProps = {
	itemSelected,
	itemCanceled,
};

const SelectMenuItemWrapper = styled.div`
	cursor: pointer;
	overflow: hidden;

	.fl-r {
		float: right;
	}

	.label {
		flex: 1;

		&.hasTips {
			white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
		}
	}

	.icon {
		width: 1.6em;
		padding: 4px 0;
		text-align: center;
	}

	.tips {
		.icon {
			width: 1em;
		}

		> span {
			padding: 0 4px;
			color: rgba(0, 0, 0, .3);
		}
	}
`;

const SelectMenuItemContentWrapper = styled.div`
	display: -webkit-flex;
  display: -moz-flex;
  display: flex;

	> div {
		padding: 4px 8px;
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

const iconContent = (icon, hasIcon, selectable) => {
	const needEmptyIcon = selectable ? false : hasIcon;

	return (needEmptyIcon || isFA(icon)) ? <div className="icon">{FAIcon(icon)}</div> : null;
};

const labelContent = (label, tips) => {
	return <div className={`label ${tips ? 'hasTips' : ''}`}>{label}</div>;
};

const controlIconContent = controlIcon => {
	return isFA(controlIcon) ? <div className="fl-r">{FAIcon(controlIcon)}</div> : null;
};

const tipsContent = tips => {
	return tips && <div className="fl-r tips">{tipsItem(tips)}</div>;
};

const checkContent = (selectable, selected) => {
	if (selectable) {
		return <div className="icon">{FAIcon(selected ? 'fa-check' : '')}</div>;
	}

	return null;
};

const editContent = (editable, tips) => {

};

class SelectMenuItem extends Component {
	constructor(props) {
		super(props);

		this.onItemChange = this.onItemChange.bind(this);
	}

	onItemChange(e) {
    const { itemKey } = this.props;
    this.props.itemSelected(itemKey);
  }

  render() {
  	const {
  		icon,
  		label,
  		controlIcon,
  		hasIcon,
  		tips,
  		selectable,
  		selected,
  		editable,
  	} = this.props;

    return (
      <SelectMenuItemWrapper>
      	<SelectMenuItemContentWrapper onClick={this.onItemChange}>
      		{checkContent(selectable, selected)}
	      	{iconContent(icon, hasIcon, selectable)}
	      	{labelContent(label, tips)}
	      	{controlIconContent(controlIcon)}
	      	{tipsContent(tips)}
	      </SelectMenuItemContentWrapper>
      </SelectMenuItemWrapper>
    );
  }
}

SelectMenuItem.propTypes = propTypes;
SelectMenuItem.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenuItem);
