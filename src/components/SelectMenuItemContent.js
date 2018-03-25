import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import { connect } from 'react-redux';

import { itemEdit } from '../actions';
import { isFA, FAIcon } from '../utils/Icon';
import Input from '../utils/Input';

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
	alignType: PropTypes.string,

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
	alignType: 'between',

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
		this.handleInputBlur = this.handleInputBlur.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { editable, edited, label } = nextProps;
		const { editInput } = this.state;

		if (editable && !edited && editInput) {
			this.setState({
				editInput: label,
			});
		}
	}

	iconContent() {
		const { icon, hasIcon, selectable } = this.props;
		const needEmptyIcon = selectable ? false : hasIcon;

		return (needEmptyIcon || isFA(icon)) ? <div className="icon">{FAIcon(icon)}</div> : null;
	};

	labelContent() {
		const {
			label,
			tips,
			editable,
			edited,
			editInputValue,
			onFocus,
			onChange,
			onKeyDown,
			onKeyUp,
			onBlur,
		} = this.props;
		const { editInput } = this.state;

		const inputValue = typeof editInputValue !== 'undefined' ? editInputValue : editInput;

		return <div className={`label ${(editable && edited) ? 'edited' : ''} ${tips ? 'hasTips' : ''}`}>
			{!edited ?
				label :
				<input
					type="text"
					value={editInputValue || editInput}
					autoFocus
					onFocus={onFocus || this.handleInputFocus}
					onChange={this.handleInputChange}
					onKeyDown={onKeyDown || this.handleInputKeyDown}
					onKeyUp={onKeyUp || this.handleInputKeyUp}
					onBlur={onBlur || this.handleInputBlur}
				/>
			}
		</div>;
	};

	controlIconContent() {
		const { controlIcon, subMenuIdx } = this.props;

		if (subMenuIdx > 0) {
			return <div className="control-icon fl-r">{FAIcon('fa-caret-right')}</div>;
		}
		return isFA(controlIcon) ? <div className=" control-icon fl-r">{FAIcon(controlIcon)}</div> : null;
	};

	tipsContent() {
		const { tips } = this.props;
		if (typeof tips === 'object') {
			return tips.length > 0 && <div className="fl-r tips">{tipsItem(tips)}</div>;
		} else {
			return tips && <div className="fl-r tips">{tips}</div>;
		}
	};

	checkContent() {
		const { selectable, selected } = this.props;
		if (selectable) {
			return <div className="check icon">{FAIcon(selected ? 'fa-check' : '')}</div>;
		}

		return null;
	};

	handleInputFocus(e) {
		Input.handleInputFocus(e);
	}

	handleInputChange(e) {
		const { onChange } = this.props;

		onChange(e.target.value);

		Input.handleInputChange(e, (value) => { this.setState({ editInput: value }); });
	}

	handleInputKeyDown(e) {
		Input.handleInputKeyDown(e);
	}

	handleInputKeyUp(e) {
		const { itemKey } = this.props;

		Input.handleInputKeyUp(e, {
			setValueFunc: () => {
				const { editInput } = this.state;
				this.setState({
					editInput: editInput.substr(0, editInput.length - 1),
				});
			},
			endEditFunc: () => {
				this.props.itemEdit(itemKey, false, this.state.editInput);
			},
			cancelEditFunc: () => {
				this.props.itemEdit(itemKey, false);
			},
		});
	}

	handleInputBlur(e) {
		const { itemKey } = this.props;
		Input.handleInputBlur(e, () => { this.props.itemEdit(itemKey, false); })
	}

  render() {
  	const { onClick, className, disabled, alignType } = this.props;

    return (
    	<SelectMenuItemContentWrapper
    		onClick={onClick}
    		className={className}
    		alignType={alignType}
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
