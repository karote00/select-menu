export const ITEM_SELECTED = 'ITEM_SELECTED';
export const ITEM_DELETE = 'ITEM_DELETE';
export const ITEM_EDIT = 'ITEM_EDIT';
export const ITEM_FOCUS = 'ITEM_FOCUS';
export const ITEM_UNFOCUS = 'ITEM_UNFOCUS';

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

export const itemUnfocus = (itemKey, menuIdx) => ({
	type: ITEM_UNFOCUS,
	payload: {
		itemKey,
		menuIdx,
	},
});
