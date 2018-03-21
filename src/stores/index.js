import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const menus = {
	0: [{
		meta: {
			addable: false,
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
		items: [2, 5],
	}],
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
  	subMenuIdx: 1,
		isFocus: false,
  },
  5: {
  	itemKey: 5,
  	label: 'America',
  	editabled: true,
  	selectable: true,
  	selected: false,
		isFocus: false,
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
  }
};

const initialState = {
	buttonLabel: 'Label',
	focusItem: null,
	focusMenu: null,
	main: menus[0],
  menus,
  menuItems,
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