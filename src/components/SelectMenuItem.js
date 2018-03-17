import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import { connect } from 'react-redux';

import { itemSelected, itemDelete } from '../actions';
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
	itemDelete: PropTypes.func.isRequired,
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
	itemDelete,
};

const SelectMenuItemWrapper = styled.div`
	position: relative;
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
			width: 1.6em;
		}

		> span {
			padding: 0 4px;
			color: rgba(0, 0, 0, .3);
		}
	}

	&:hover {
		background: rgba(0, 0, 0, .05);

		.edit_content {
			transform: translateX(calc(100% - 3.2em));

			.icon span:hover {
				color: rgba(0, 0, 0, .6);
			}

			&.delete_clicked {
				transform: translateX(calc(33.3% - 1.6em + 4px));
			}
		}
	}
`;

const SelectMenuItemContentWrapper = styled.div`
	display: -webkit-flex;
  display: -moz-flex;
  display: flex;

	> div {
		padding: 4px;
	}
`;

const EditableContent = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	transition: transform .1s linear;
	transform: translateX(100%);
	padding: 4px 0;
	width: 150%;
	background: rgb(217, 217, 217);

	span {
		width: 1em;
		padding: 0 4px;
		color: rgba(0, 0, 0, .3);
	}

	.delete_content {
		width: unset;

		span {
			width: unset;
		}

		.controls {
			padding-left: 8px;

			span {
				font-weight: bold;
				text-decoration: underline;
				padding: 0 8px;

				&:hover {
					color: rgba(0, 0, 0, .6);
				}
			}
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

class SelectMenuItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			deleteClicked: false,
			selectMenuItemHover: false,
		};

		this.onItemChange = this.onItemChange.bind(this);
		this.handleSelectMenuItemMouseHover = this.handleSelectMenuItemMouseHover.bind(this);
		this.handleSelectMenuItemMouseLeave = this.handleSelectMenuItemMouseLeave.bind(this);
		this.cancelSelectMenuItemHover = this.cancelSelectMenuItemHover.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleDeleteItem = this.handleDeleteItem.bind(this);
		this.handleCancelEditable = this.handleCancelEditable.bind(this);
	}

	onItemChange(e) {
    const { itemKey } = this.props;
    this.props.itemSelected(itemKey);
  }

  editContent(editable, tips) {
  	const { deleteClicked, selectMenuItemHover } = this.state;

		return editable &&
			<EditableContent
    		className={`edit_content ${deleteClicked ? 'delete_clicked' : ''}`}
    	>
				<span key="1" className="icon">{FAIcon('fa-edit')}</span>
				<span key="2" className="icon" onClick={this.handleDeleteClick}>{FAIcon('fa-trash')}</span>
				<span key="3" className="delete_content">
					Are You Sure?
					<span className="controls">
						<span onClick={this.handleDeleteItem}>Yes</span>
						<span onClick={this.handleCancelEditable}>No</span>
					</span>
				</span>
			</EditableContent>;
	};

	cancelSelectMenuItemHover() {
		this.setState({ selectMenuItemHover: false, deleteClicked: false });
	}

	handleDeleteItem() {
    const { itemKey, layer } = this.props;
		this.props.itemDelete(itemKey, layer);
	}

	handleDeleteClick() {
		this.setState({ deleteClicked: true });
	}

	handleCancelEditable() {
		this.cancelSelectMenuItemHover();
	}

	handleSelectMenuItemMouseHover() {
		this.setState({ selectMenuItemHover: true });
	}

	handleSelectMenuItemMouseLeave() {
		this.cancelSelectMenuItemHover();
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
      <SelectMenuItemWrapper
    		onMouseEnter={this.handleSelectMenuItemMouseHover}
    		onMouseLeave={this.handleSelectMenuItemMouseLeave}
      >
      	<SelectMenuItemContentWrapper onClick={this.onItemChange}>
      		{checkContent(selectable, selected)}
	      	{iconContent(icon, hasIcon, selectable)}
	      	{labelContent(label, tips)}
	      	{controlIconContent(controlIcon)}
	      	{tipsContent(tips)}
	      </SelectMenuItemContentWrapper>
    		{this.editContent(editable)}
      </SelectMenuItemWrapper>
    );
  }
}

SelectMenuItem.propTypes = propTypes;
SelectMenuItem.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenuItem);
