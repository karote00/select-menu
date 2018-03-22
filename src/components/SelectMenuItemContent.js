import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import { connect } from 'react-redux';

import { itemEdit } from '../actions';
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
	edited: PropTypes.bool,
	disabled: PropTypes.bool,

	// Event
	onClick: PropTypes.func,
	itemEdit: PropTypes.func.isRequired,
};

const defaultProps = {
	// Props
	icon: '',
	label: '',
	controlIcon: '',
	hasIcon: false,
	tips: [],
	selectable: false,
	selected: false,
	editable: false,
	edited: false,
	disabled: false,

	// Event
	onClick() {},

	// Actions
	itemEdit() {},
};

const mapStateToProps = (state) => ({
	menuData: state,
});

const mapDispatchToProps = {
	itemEdit,
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
		text-align: right;
	}

	.label {
		input[type="text"] {
    	border: none;
	    width: 100%;
	    height: 100%;
	    padding: 4px;
	    font-size: 1rem;
	    outline: none;
	    background: transparent;
		}

		&.edited {
			padding: 0;
		}
	}

	.tips {
		.icon {
			width: calc(1.6em + 8px);
		}

		> span {
			padding: 0 4px;
			color: #a0a0a0;
		}
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
	constructor(props) {
		super(props);

		this.state = {
			editInput: props.label,
		};

		this.handleInputFocus = this.handleInputFocus.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
		this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
	}

	iconContent() {
		const { icon, hasIcon, selectable } = this.props;
		const needEmptyIcon = selectable ? false : hasIcon;

		return (needEmptyIcon || isFA(icon)) ? <div className="icon">{FAIcon(icon)}</div> : null;
	};

	labelContent() {
		const { label, tips, editable, edited } = this.props;
		const { editInput } = this.state;

		return <div className={`label ${(editable && edited) ? 'edited' : ''} ${tips ? 'hasTips' : ''}`}>
			{!edited ?
				label :
				<input
					type="text"
					value={editInput}
					autoFocus
					onFocus={this.handleInputFocus}
					onChange={this.handleInputChange}
					onKeyDown={this.handleInputKeyDown}
					onKeyUp={this.handleInputKeyUp}
				/>
			}
		</div>;
	};

	controlIconContent() {
		const { controlIcon, subMenuIdx } = this.props;

		if (subMenuIdx > 0) {
			return <div className="fl-r">{FAIcon('fa-caret-right')}</div>;
		}
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

	handleInputFocus(e) {
		const { label } = this.props;
		const { editInput } = this.state;

		e.target.value = '';
		e.target.value = label;
		e.target.select();
	}

	handleInputChange(e) {
		const { value } = e.target;
		this.setState({ editInput: value });
	}

	handleInputKeyDown(e) {
		const { keyCode } = e;

		if (keyCode === 8) { // press backspace
			e.preventDefault();
		}
	}

	handleInputKeyUp(e) {
		e.preventDefault();
		e.stopPropagation();

		const { itemKey } = this.props;
		const { keyCode } = e;
		const { editInput } = this.state;

		switch (keyCode) {
			case 8: // press backspace
				const v = e.target.value;
				e.target.value = v.substr(0, v.length - 1);
				break;
			case 13: // press enter
				this.props.itemEdit(itemKey, false, editInput);
				break;
			case 27: // press escape
				this.props.itemEdit(itemKey, false);
				break;
			default:
				break;
		}
	}

  render() {
  	const { onClick, className, disabled } = this.props;

    return (
    	<SelectMenuItemContentWrapper
    		onClick={onClick}
    		className={className}
    	>
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
