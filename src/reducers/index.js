import { TEST1, TEST2 } from '../actions';

const reducers = (state = [], action) => {
	switch (action.type) {
		case TEST1:
			return 'test1';
		case TEST2:
			return 'test2';
		default:
			return 'test1';
	}
}

export default reducers;