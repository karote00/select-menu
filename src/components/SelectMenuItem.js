import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import { connect } from 'react-redux';

import SelectMenuItemContent from './SelectMenuItemContent';
import SelectMenu from './SelectMenu';

import {
	itemSelected,
	itemDelete,
	itemEdit,
	itemFocus,
	openMenu,
} from '../actions';
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
	disabled: PropTypes.bool,
	isFocus: PropTypes.bool,
	subMenuIdx: PropTypes.number,
	layer: PropTypes.number,
	layerIdx: PropTypes.number,

	// Events
	onClick: PropTypes.func,

	// Actions
	itemSelected: PropTypes.func.isRequired,
	itemDelete: PropTypes.func.isRequired,
	itemEdit: PropTypes.func.isRequired,
	itemFocus: PropTypes.func.isRequired,
	openMenu: PropTypes.func.isRequired,
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
	disabled: false,
	isFocus: false,
	subMenuIdx: 0,
	layer: 0,
	layerIdx: 0,

	// Actions
	itemSelected() {},
	itemDelete() {},
	itemEdit() {},
	itemFocus() {},
	openMenu() {},
};

const mapStateToProps = (state) => ({
	menuData: state,
});

const mapDispatchToProps = {
	itemSelected,
	itemDelete,
	itemEdit,
	itemFocus,
	openMenu,
};

const SelectMenuItemContainer = styled.div`
	position: relative;
`;

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
		width: calc(1.6em + 8px);
		padding: 4px 0;
		text-align: center;
	}

	&.is_focus:not(.disabled) {
		background: #d9d9d9;
	}

	&.is_hover:not(.disabled) {
		background: #d9d9d9;

		> .edit_content.has_edit {
			transform: translateX(calc(100% - 3.2em));

			.icon span:hover {
				color: #5c5c5c;
			}

			&.delete_clicked {
				transform: translateX(calc(33.3% - 1.6em + 4px));

				.delete span {
					color: #5c5c5c;
				}
			}
		}
	}

	&.disabled {
		color: #a0a0a0;
		cursor: not-allowed;
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
		width: calc(1em + 8px);
		padding: 0 4px;
		color: #a0a0a0;
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
					color: #5c5c5c;
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

	onItemChange(e, s) {
    const { itemKey, editable, edited, disabled, subMenuIdx, menuData } = this.props;
    const { ctrlKey, metaKey, layersOpen } = menuData;

    if (disabled) return false;
    const multiClickEnable = ctrlKey || metaKey;

    if (subMenuIdx > 0) {
    	const subMenuIsOpen = layersOpen.indexOf(subMenuIdx) > -1;
    	this.props.openMenu(subMenuIdx, !subMenuIsOpen);
    } else if (!editable || (editable && !edited)) {
    	this.props.itemSelected(itemKey);
  		if (!multiClickEnable) this.props.openMenu(0, false);
    }
  }

  editContent() {
  	const { editable, isAddNewItem, label } = this.props;
  	const { deleteClicked, selectMenuItemHover } = this.state;

		return editable &&
			<EditableContent
    		className={`edit_content ${(editable && isAddNewItem) ? '' : 'has_edit'} ${deleteClicked ? 'delete_clicked' : ''}`}
    	>
				<span key="1" className="icon edit" onClick={this.handleEditItem}>{FAIcon('fa-edit')}</span>
				<span key="2" className="icon delete" onClick={this.handleDeleteClick}>{FAIcon('fa-trash')}</span>
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
		this.props.itemEdit(itemKey, true);
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
		const { itemKey, layer, disabled } = this.props;
		this.setState({ selectMenuItemHover: true });
		this.props.itemFocus(itemKey, layer);
	}

	handleSelectMenuItemMouseLeave() {
		const { itemKey, layer, disabled } = this.props;
		this.cancelSelectMenuItemHover();
	}

  render() {
  	const { disabled, isFocus, itemKey, layer, subMenuIdx, menuData, layerIdx, onClick } = this.props;
  	const { selectMenuItemHover } = this.state;
  	let subMenuContent = null;
  	let subLayer = subMenuIdx;
  	let subMenuData = [];

  	if (subMenuIdx > 0) {
  		const { menus, menuItems, layersOpen } = menuData;
  		subMenuData = menus[subMenuIdx].map(m => ({
	      ...m,
	      items: m.items.map(it => menuItems[it])
	    }));
	    const isOpen = layersOpen.indexOf(subMenuIdx) > -1;

  		subMenuContent = (<SelectMenu
  			layerIdx={layerIdx + 1}
        layer={subLayer}
        menu={subMenuData}
        isOpen={isOpen}
      />);
  	}

    return (
    	<SelectMenuItemContainer>
	      <SelectMenuItemWrapper
	    		onMouseEnter={this.handleSelectMenuItemMouseHover}
	    		onMouseLeave={this.handleSelectMenuItemMouseLeave}
	    		className={`${disabled ? 'disabled' : ''} ${selectMenuItemHover ? 'is_hover' : ''} ${isFocus ? 'is_focus' : ''}`}
	      >
	      	<SelectMenuItemContent onClick={onClick || this.onItemChange} {...this.props} />
	    		{this.editContent()}
	      </SelectMenuItemWrapper>
    		{subMenuContent}
     	</SelectMenuItemContainer>
    );
  }
}

SelectMenuItem.propTypes = propTypes;
SelectMenuItem.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenuItem);
