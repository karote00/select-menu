import {
	ITEM_SELECTED,
	ITEM_DELETE,
	ITEM_EDIT,
	ITEM_FOCUS,
	OPEN_MENU,
	MOVE_FOCUS,
	COMBINATION_KEY,
} from '../actions';

const menus = (state, action) => {
	switch (action.type) {
		case ITEM_DELETE: {
			const { itemKey, menuIdx } = action.payload;

			state[menuIdx].map(g => {
				const idx = g.items.indexOf(action.payload.itemKey);

				if (idx > -1) {
					g.items.splice(idx, 1);
				}
				return g;
			});

			return state;
		}
		default:
			return state;
	}
};

const menuItemMoveFocus = (state, action) => {
	switch (action.type) {
		case MOVE_FOCUS: {
			const { direction } = action.payload;
			const { menus, layersOpen, menuItems, focusMenuIdx, layersOpenFocusItem } = state;
			const currentFocusMenuIdx = focusMenuIdx ? layersOpen.indexOf(focusMenuIdx) : layersOpen.length - 1;
			const focusItemIdx = layersOpenFocusItem[currentFocusMenuIdx];
			const openMenu = menus[layersOpen[layersOpen.length - 1]];
			const openMenuItemIdxs = openMenu.reduce((sum, m) => sum.concat(m.items), []);
			const focusItem = menuItems[focusItemIdx];
			const topMenuItemIdx = openMenuItemIdxs[0];
			const topMenuItem = menuItems[topMenuItemIdx];
			const lastMenuItemIdx = openMenuItemIdxs[openMenuItemIdxs.length - 1];
			const lastMenuItem = menuItems[lastMenuItemIdx];
			const focusIdx = openMenuItemIdxs.indexOf(focusItemIdx);

			switch (direction) {
				case 'UP': {
					if (focusItem) {
						focusItem.isFocus = false;

						let preItemIdx = focusIdx - 1 < 0 ? 0 : focusIdx - 1;
						let preMenuItem = menuItems[openMenuItemIdxs[preItemIdx]];

						while (preMenuItem.disabled) {
							preItemIdx = preItemIdx - 1 < 0 ? 0 : preItemIdx - 1;
							preMenuItem = menuItems[openMenuItemIdxs[preItemIdx]];
						}

						preMenuItem.isFocus = true;
						layersOpenFocusItem[currentFocusMenuIdx] = openMenuItemIdxs[preItemIdx];
					} else {
						lastMenuItem.isFocus = true;
						layersOpenFocusItem.push(lastMenuItemIdx);
					}
					break;
				}
				case 'DOWN': {
					if (focusItem) {
						focusItem.isFocus = false;

						let nextItemIdx = focusIdx + 1 > openMenuItemIdxs.length - 1 ? openMenuItemIdxs.length - 1 : focusIdx + 1;
						let nextMenuItem = menuItems[openMenuItemIdxs[nextItemIdx]];

						while (nextMenuItem.disabled) {
							nextItemIdx = nextItemIdx + 1 > openMenuItemIdxs.length - 1 ? openMenuItemIdxs.length - 1 : nextItemIdx + 1;
							nextMenuItem = menuItems[openMenuItemIdxs[nextItemIdx]];
						}

						nextMenuItem.isFocus = true;
						layersOpenFocusItem[currentFocusMenuIdx] = openMenuItemIdxs[nextItemIdx];
					} else {
						topMenuItem.isFocus = true;
						layersOpenFocusItem.push(topMenuItemIdx);
					}
					break;
				}
				case 'RIGHT': {
					topMenuItem.isFocus = true;
					layersOpenFocusItem.push(topMenuItemIdx);
					break;
				}
				case 'LEFT': {
					topMenuItem.isFocus = true;
					layersOpenFocusItem.push(topMenuItemIdx);
					break;
				}
				default:
					break;
			}

			return {
				...state.menus,
			};
		}
		default:
			return state;
	}
};

const menuItems = (state, action) => {
	switch (action.type) {
		case ITEM_SELECTED: {
			const itemKey = action.payload.itemKey;
			const item = state[itemKey];

			if (item.selectable && !item.icon) {
				item.selected = !item.selected;
			}

			return {
				...state,
				[itemKey]: item,
			};
		}
		case ITEM_EDIT: {
			const { itemKey, edited, value } = action.payload;
			const item = state[itemKey];

			if (item.editable) {
				item.edited = edited;
				if (value) item.label = value;
			}

			return {
				...state,
				[itemKey]: item,
			};
		}
		case ITEM_FOCUS: {
			const { itemKey } = action.payload;
			const item = state[itemKey];

			item.isFocus = true;

			return {
				...state,
				[itemKey]: item,
			};
		}
		default:
			return state;
	}
};

const reducers = (state = initialState, action) => {
	switch (action.type) {
		case ITEM_SELECTED: {
			const { itemKey } = action.payload;
			const { selectedItems } = state;

			const selectedItemIdx = selectedItems.indexOf(itemKey);
			if (selectedItemIdx > -1) {
				selectedItems.splice(selectedItemIdx, 1);
			} else {
				selectedItems.push(itemKey);
			}

			return {
				...state,
				selectedItems,
				menuItems: menuItems(state.menuItems, action),
			};
		}
		case ITEM_DELETE: {
			const menuList = menus(state.menus, action);

			return {
				...state,
				main: menuList[0],
				menus: menuList,
			};
		}
		case ITEM_EDIT:
			return {
				...state,
				menuItems: menuItems(state.menuItems, action),
			};
		case ITEM_FOCUS: {
			const { itemKey, menuIdx } = action.payload;

			const layersOpenFocusItem = state.layersOpenFocusItem;
			const currentFocusMenuIdx = state.layersOpen.indexOf(menuIdx);
			const currentFocusItem = state.menuItems[state.layersOpenFocusItem[currentFocusMenuIdx]];

			if (currentFocusItem) currentFocusItem.isFocus = false;

			if (layersOpenFocusItem[currentFocusMenuIdx]) layersOpenFocusItem[currentFocusMenuIdx] = itemKey;
			else layersOpenFocusItem.push(itemKey);

			return {
				...state,
				menuItems: menuItems(state.menuItems, action),
				focusMenuIdx: menuIdx,
				layersOpenFocusItem,
			};
		}
		case OPEN_MENU: {
			const { menus, menuItems, layersOpen, layersOpenFocusItem } = state;
			const { menuIdx, isOpen } = action.payload;
			const layerIdx = layersOpen.indexOf(menuIdx);
			let focusMenuIdx = -1;

			if (isOpen) {
				if (layerIdx === -1) layersOpen.push(menuIdx);
				else layersOpen[layerIdx] = menuIdx;

				focusMenuIdx = menuIdx;
			} else {
				if (layerIdx > -1) {
					const closeMenus = layersOpen.splice(layerIdx, layersOpen.length - layerIdx);
					layersOpenFocusItem.splice(layerIdx, layersOpenFocusItem.length - layerIdx);

					closeMenus.map(cm => menus[cm].map(m => m.items.map(itemIdx => {
						menuItems[itemIdx].isFocus = false;
					})));
				}
				focusMenuIdx = layersOpen[layersOpen.length - 1];
			}

			return {
				...state,
				layersOpen,
				focusMenuIdx,
				layersOpenFocusItem,
				menus,
			};
		}
		case MOVE_FOCUS:
			return {
				...state,
				menus: menuItemMoveFocus(state, action),
			};
		case COMBINATION_KEY:
			return {
				...state,
				[action.payload.key]: action.payload.isKeyPress,
			};
		default:
			return state;
	}
};

export default reducers;
