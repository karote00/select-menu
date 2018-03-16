import { ITEM_SELECTED, ITEM_CANCELED } from '../actions';



const reducers = (state = initialState, action) => {
	switch (action.type) {
		case ITEM_SELECTED:
			return [
				...state
			];
		case ITEM_CANCELED:
			return [
				...state
			];
		default:
			return state;
	}
}

export default reducers;