export const ITEM_SELECTED = 'ITEM_SELECTED';
export const ITEM_CANCELED = 'ITEM_CANCELED';

export const itemSelected = (layer = 1, idx) => ({
	type: ITEM_SELECTED,
	payload: {
		layer,
		idx,
	},
});

export const itemCanceled = (layer = 1, idx) => ({
	type: ITEM_CANCELED,
	payload: {
		layer,
		idx,
	},
});
