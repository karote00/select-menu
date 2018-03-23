import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const menus = {
	0: [{
		meta: {
			addable: true,
			itemKey: 9,
		},
		items: [1, 2, 6],
	}, {
		meta: {
			addable: false,
		},
		items: [3, 4, 5],
	}],
	1: [{
		meta: {
			addable: false,
		},
		items: [8, 7],
	}],
};

const addMenuItem = {
	label: 'Add Menu Item +',
	disabled: false,
	selectable: false,
	selected: false,
	editable: true,
	edited: false,
	isFocus: false,
	isAddNewItem: true,
};

const menuItems = {
	1: {
		itemKey: 1,
		label: 'rocket',
		tips: [100, 200, 'fa-mobile'],
		selectable: true,
		selected: false,
		isFocus: false,
	},
  2: {
  	itemKey: 2,
  	label: 'smiley',
  	selectable: true,
  	selected: false,
  	editable: true,
  	edited: false,
		isFocus: false,
  },
  3: {
  	itemKey: 3,
  	icon: 'fa-stop',
  	label: 'park',
  	tips: [10, 20, 'fa-car'],
		isFocus: false,
  },
  4: {
  	itemKey: 4,
  	icon: 'fa-play',
  	label: 'play',
  	tips: ['fa-mobile'],
		isFocus: false,
  },
  5: {
  	itemKey: 5,
  	label: 'America',
  	editabled: true,
  	selectable: false,
  	selected: false,
		isFocus: false,
  	subMenuIdx: 1,
  },
  6: {
  	itemKey: 6,
  	label: 'smiley',
  	disabled: true,
  	selectable: true,
  	selected: false,
  	editable: true,
  	edited: false,
		isFocus: false,
  },
  7: {
  	itemKey: 7,
  	label: 'Jesus',
  	disabled: false,
  	selectable: true,
  	selected: false,
  	editable: false,
  	edited: false,
		isFocus: false,
  },
  8: {
  	itemKey: 8,
  	label: 'God',
  	disabled: false,
  	selectable: true,
  	selected: false,
  	editable: true,
  	edited: false,
		isFocus: false,
  },
  9: {
  	itemKey: 9,
  	...addMenuItem,
  },
};

const initialState = {
	buttonLabel: 'Label',
	focusMenuIdx: null,
	main: menus[0],
  menus,
  menuItems,
  addMenuItem,
  layersOpen: [],
  layersOpenFocusItem: [],
  selectedItems: [],
  ctrlKey: false,
  metaKey: false,
};
// const initialState = {};

const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(thunk),
	),
);

export default store;