import React from 'react';
import { storiesOf } from '@storybook/react';
import Provider, {initialState} from './util/provider';
import LanguageProvider from '../src/App/hoc/language';
import Landing from '../src/App/landing';

export default () => {
	storiesOf('Landing Page', module)
	.addDecorator((bundle) => {
		const {story, state = {}} = bundle();
		return <Provider story={story()} state={{ ...initialState(), ...state}} />
	})
	.add('default', () => {
	  return {story: () => <Landing />}
	})
	.add('loading', () => {
		const state = { auth: {
			busy: true
		}}
	  return {story: () => <Landing />, state}
	})
	
}
