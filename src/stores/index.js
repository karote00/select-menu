import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const menuItems = {
	1: {
		itemKey: 1,
		label: 'rocket',
		tips: [100, 200, 'fa-mobile'],
		selectable: true,
		selected: false,
	},
  2: {
  	itemKey: 2,
  	label: 'smiley',
  	disabled: true,
  	selectable: true,
  	selected: false,
  	editable: true,
  	edited: false,
  },
  3: {
  	itemKey: 3,
  	icon: 'fa-stop',
  	label: 'park',
  	tips: [10, 20, 'fa-car'],
  },
  4: {
  	itemKey: 4,
  	icon: 'fa-play',
  	label: 'play',
  	tips: ['fa-mobile'],
  },
  5: {
  	itemKey: 5,
  	label: 'America',
  	editabled: true,
  	selectable: true,
  	selected: false,
  	subMenu: 1,
  },
  6: {
  	itemKey: 6,
  	label: 'smiley',
  	disabled: true,
  	selectable: true,
  	selected: false,
  	editable: true,
  	edited: false,
  }
};

const initialState = {
	buttonLabel: 'Label',
	main: [{
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
  sub: {
  	1: [{
  		meta: {
  			addable: false,
  		},
  		items: [2, 5],
  	}],
  },
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