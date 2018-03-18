import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import { connect } from 'react-redux';

import SelectMenuItemContent from './SelectMenuItemContent';

import { itemSelected, itemDelete, itemEdit } from '../actions';
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
	itemEdit: PropTypes.func.isRequired,
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
	itemEdit,
};

const SelectMenuItemWrapper = styled.div`
	position: relative;
	cursor: pointer;
	overflow: hidden;

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
		this.handleEditItem = this.handleEditItem.bind(this);
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
				<span key="1" className="icon" onClick={this.handleEditItem}>{FAIcon('fa-edit')}</span>
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

	handleEditItem() {
		const { itemKey } = this.props;
		this.props.itemEdit(itemKey);
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
  	const { editable } = this.props;

    return (
      <SelectMenuItemWrapper
    		onMouseEnter={this.handleSelectMenuItemMouseHover}
    		onMouseLeave={this.handleSelectMenuItemMouseLeave}
      >
      	<SelectMenuItemContent onClick={this.onItemChange} {...this.props} />
    		{this.editContent(editable)}
      </SelectMenuItemWrapper>
    );
  }
}

SelectMenuItem.propTypes = propTypes;
SelectMenuItem.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenuItem);
