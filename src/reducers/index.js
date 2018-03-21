import {
	ITEM_SELECTED,
	ITEM_DELETE,
	ITEM_EDIT,
	ITEM_FOCUS,
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
		case ITEM_FOCUS: {
			return state;
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
		case ITEM_DELETE:
			return {
				...state,
				main: menus(state.menus, action)[0],
			};
		case ITEM_EDIT:
			return {
				...state,
				menuItems: menuItems(state.menuItems, action),
			};
		case ITEM_FOCUS:
			return {
				...state,
				menus: menus(state.menus, action),
			};
		default:
			return state;
	}
};

export default reducers;
