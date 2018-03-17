import { ITEM_SELECTED, ITEM_CANCELED } from '../actions';

const menuItems = (state, action) => {
	switch (action.type) {
		case ITEM_SELECTED:
			const item = state[action.payload.itemKey];

			if (item.selectable && !item.icon) {
				item.selected = !item.selected;
			}

			return {
				...state,
				[action.itemKey]: item,
			};
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
		case ITEM_CANCELED:
			return {
				...state
			};
		default:
			return state;
	}
};

export default reducers;