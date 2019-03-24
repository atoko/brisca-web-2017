import React from 'react';
import { storiesOf } from '@storybook/react';
import Provider, {initialState} from './util/provider';
import LanguageProvider from '../src/App/hoc/language';
import { InventoryComponent } from '../src/App/inventory';

let WithLanguage = (props) => {
	return (<LanguageProvider><InventoryComponent {...props} /></LanguageProvider>);
}

export default () => {
	storiesOf('Inventory Page', module)
	.addDecorator((story) => {
		return <Provider story={story()} state={initialState()} />
	})
	.add('default', () => {
		return <WithLanguage />
	})
	.add('loading matches', () => {
		return <WithLanguage isLoading={ true } />;
	})
	.add('matches loaded', () => {
		return <WithLanguage message={ "could not save" } />;
	})	
	.add('preferences saved', () => {
		return <WithLanguage message={ "Saved preferences"} />;
	})	
	.add('preferences error', (props) => {
		return <WithLanguage {...props} error={ true } message={ "could not save" } />;
	})		
}
