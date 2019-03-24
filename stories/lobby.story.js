import React from 'react';
import { storiesOf } from '@storybook/react';
import Provider, {initialState} from './util/provider';
import LanguageProvider from '../src/App/hoc/language';
import Lobby from '../src/App/lobby';

let WithLanguage = (props) => {
	return (<LanguageProvider><Lobby {...props} /></LanguageProvider>);
}

export default () => {
	storiesOf('Lobby Page', module)
	.addDecorator((bundle) => {
		const {story, state = {}} = bundle();
		return <Provider story={story()} state={{ ...initialState(), ...state}} />
	})
	.add('default', () => {
		return {story: (props) => { return <WithLanguage {...props} /> } }
	})
	.add('loading', () => {
		const state = {
			briscas: {
				isPosting: true
			}
		}
		return {
			story: (props) => <WithLanguage {...props} />,
			state
		};
	})
}
