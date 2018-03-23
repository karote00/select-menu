export const ITEM_SELECTED = 'ITEM_SELECTED';
export const ITEM_DELETE = 'ITEM_DELETE';
export const ITEM_EDIT = 'ITEM_EDIT';
export const ITEM_FOCUS = 'ITEM_FOCUS';
export const ITEM_UNFOCUS = 'ITEM_UNFOCUS';
export const OPEN_MENU = 'OPEN_MENU';
export const MOVE_FOCUS = 'MOVE_FOCUS';
export const COMBINATION_KEY = 'COMBINATION_KEY';

export const itemSelected = (itemKey) => ({
	type: ITEM_SELECTED,
	payload: {
		itemKey,
	},
});

export const itemDelete = (itemKey, menuIdx) => ({
	type: ITEM_DELETE,
	payload: {
		itemKey,
		menuIdx,
	},
});

export const itemEdit = (itemKey, edited, value) => ({
	type: ITEM_EDIT,
	payload: {
		itemKey,
		edited,
		value,
	},
});

export const itemFocus = (itemKey, menuIdx) => ({
	type: ITEM_FOCUS,
	payload: {
		itemKey,
		menuIdx,
	},
});

export const openMenu = (menuIdx, isOpen) => ({
	type: OPEN_MENU,
	payload: {
		menuIdx,
		isOpen,
	},
});

export const moveFocus = direction => ({
	type: MOVE_FOCUS,
	payload: {
		direction,
	},
});

export const combinationKey = (key, isKeyPress) => ({
	type: COMBINATION_KEY,
	payload: {
		key,
		isKeyPress,
	},
});
