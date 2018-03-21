import {
	ITEM_SELECTED,
	ITEM_DELETE,
	ITEM_EDIT,
	ITEM_FOCUS,
	ITEM_UNFOCUS,
	OPEN_MENU,
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
		case OPEN_MENU: {
			const { menuIdx, isOpen } = action.payload;
			const menu = state[menuIdx];

			menu.isOpen = isOpen;

			return {
				...state,
				[menuIdx]: menu,
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
		case ITEM_UNFOCUS: {
			const { itemKey } = action.payload;
			const item = state[itemKey];

			item.isFocus = false;

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
		case ITEM_FOCUS:
			return {
				...state,
				menuItems: menuItems(state.menuItems, action),
				focusItem: action.payload.itemKey,
				focusMenu: action.payload.menuIdx,
			};
		case ITEM_UNFOCUS:
			return {
				...state,
				menuItems: menuItems(state.menuItems, action),
				focusItem: null,
				focusMenu: null,
			};
		case OPEN_MENU: {
			const menuList = menus(state.menus, action);

			return {
				...state,
				main: menuList[0],
				menus: menuList,
			};
		}
		default:
			return state;
	}
};

export default reducers;
