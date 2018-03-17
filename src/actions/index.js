export const ITEM_SELECTED = 'ITEM_SELECTED';
export const ITEM_CANCELED = 'ITEM_CANCELED';

export const itemSelected = (itemKey) => ({
	type: ITEM_SELECTED,
	payload: {
		itemKey,
	},
});

export const itemCanceled = (itemKey) => ({
	type: ITEM_CANCELED,
	payload: {
		itemKey,
	},
});
