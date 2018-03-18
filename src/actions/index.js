export const ITEM_SELECTED = 'ITEM_SELECTED';
export const ITEM_DELETE = 'ITEM_DELETE';
export const ITEM_EDIT = 'ITEM_EDIT';

export const itemSelected = (itemKey) => ({
	type: ITEM_SELECTED,
	payload: {
		itemKey,
	},
});

export const itemDelete = (itemKey, layer = 'main') => ({
	type: ITEM_DELETE,
	payload: {
		itemKey,
		layer,
	},
});

export const itemEdit = (itemKey) => ({
	type: ITEM_EDIT,
	payload: {
		itemKey,
	},
});