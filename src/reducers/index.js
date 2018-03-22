import {
	ITEM_SELECTED,
	ITEM_DELETE,
	ITEM_EDIT,
	ITEM_FOCUS,
	OPEN_MENU,
	MOVE_FOCUS,
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
			const { menus, layersOpen, menuItems, focusItemIdx, focusMenuIdx } = state;
			const openMenu = menus[layersOpen[layersOpen.length - 1]];
			const openMenuItemIdxs = openMenu.reduce((sum, m) => sum.concat(m.items), []);
			const focusItem = menuItems[focusItemIdx];
			// console.warn(state)
			// console.warn(openMenu)
			// console.warn(openMenuItemIdxs)
			// console.error(focusItemIdx)
			const focusIdx = openMenuItemIdxs.indexOf(focusItemIdx);
			// console.error(focusIdx)
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
						state.focusItemIdx = openMenuItemIdxs[preItemIdx];
					} else {
						const lastMenuItemIdx = openMenuItemIdxs[openMenuItemIdxs.length - 1];
						const topMenuItem = menuItems[lastMenuItemIdx];
						topMenuItem.isFocus = true;
						state.focusItemIdx = openMenuItemIdxs[lastMenuItemIdx];
					}
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

			return state;
		}
		default:
			return state;
	}
};

const reducers = (state = initialState, action) => {
	switch (action.type) {
		case ITEM_SELECTED:
			return {
				...state,
				menuItems: menuItems(state.menuItems, action),
			};
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
			const currentFocusItem = state.menuItems[state.focusItemIdx];
			if (currentFocusItem) currentFocusItem.isFocus = false;

			return {
				...state,
				menuItems: menuItems(state.menuItems, action),
				focusItemIdx: action.payload.itemKey,
				focusMenuIdx: action.payload.menuIdx,
			};
		}
		case OPEN_MENU: {
			const { layersOpen } = state;
			const { menuIdx, isOpen } = action.payload;
			const layerIdx = layersOpen.indexOf(menuIdx);

			if (isOpen) {
				if (layerIdx === -1) layersOpen.push(menuIdx);
			} else {
				if (layerIdx > -1) layersOpen.splice(layerIdx, layersOpen.length - layerIdx);
			}

			return {
				...state,
				layersOpen,
			};
		}
		case MOVE_FOCUS:
			return {
				...state,
				menus: menuItemMoveFocus(state, action),
			};
		default:
			return state;
	}
};

export default reducers;
