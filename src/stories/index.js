import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import { Provider } from 'react-redux';
import store from '../stores';

import SelectMenuWrapper from '../components/SelectMenuWrapper';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);


storiesOf('Select Menu Item', module)
	.add('Select Button', () =>
		<Provider store={store}>
			<div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<SelectMenuWrapper buttonAlignType="between" />
			</div>
		</Provider>
	);