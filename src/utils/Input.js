export const handleInputFocus = (e) => {
	const tmp = e.target.value;

	e.target.value = '';
	e.target.value = tmp;
	e.target.select();
};

export const handleInputKeyDown = (e) => {
	const { keyCode } = e;

	if (keyCode === 8) { // press backspace
		e.preventDefault();
	}
};

export const handleInputKeyUp = (e, opt) => {
	e.preventDefault();
	e.stopPropagation();

	const { setValueFunc, endEditFunc, cancelEditFunc } = opt;

	switch (e.keyCode) {
		case 8: // press backspace
			setValueFunc && setValueFunc();
			break;
		case 13: // press enter
			endEditFunc && endEditFunc();
			break;
		case 27: // press escape
			cancelEditFunc && cancelEditFunc();
			break;
		default:
			break;
	}
};

export const handleInputBlur = (e, cancelEditFunc) => {
	cancelEditFunc && cancelEditFunc();
};

export const handleInputChange = (e, setValueFunc) => {
	setValueFunc && setValueFunc(e.target.value);
}

const input = {
	handleInputFocus,
	handleInputKeyDown,
	handleInputKeyUp,
	handleInputBlur,
	handleInputChange,
};

export default input;
