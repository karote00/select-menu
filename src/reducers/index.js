import { ITEM_SELECTED, ITEM_DELETE } from '../actions';

const menu = (state, action) => {
	switch (action.type) {
		case ITEM_DELETE:
			const menu = state.map(g => {
				const idx = g.items.indexOf(action.payload.itemKey);
				if (idx > -1) {
					g.items.splice(idx, 1);
				}
				return g;
			})

			return state;
		default:
			return state;
	}
};

const menuItems = (state, action) => {
	switch (action.type) {
		case ITEM_SELECTED:
			const item = state[action.payload.itemKey];

			if (item.selectable && !item.icon) {
				item.selected = !item.selected;
			}

			return {
				...state,
				[action.payload.itemKey]: item,
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
		case ITEM_DELETE:
			const layerIdx = action.payload.layer;
			const layer = layerIdx === 'main' ? state.main : state.sub[layerIdx];

			return {
				...state,
				main: menu(layer, action),
			};
		default:
			return state;
	}
};

export default reducers;