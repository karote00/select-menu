import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const initialState = [
  {
    meta: {
      addable: false,
    },
    items: [
      { icon: 'fa-rocket', label: 'rocket', tips: [100, 200, 'fa-mobile'] },
      { label: 'smiley', disabled: true },
    ]
  },
  {
    meta: {
      addable: false,
    },
    items: [
      { icon: 'fa-stop', label: 'park', tips: [10, 20, 'fa-car'] },
      { icon: 'fa-play', label: 'play', tips: ['fa-mobile'] },
      { label: 'America', editabled: true },
    ]
  }
];
// const initialState = {};

const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(thunk),
	),
);

export default store;