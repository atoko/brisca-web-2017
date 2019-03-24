import React from 'react';
import { storiesOf } from '@storybook/react';
import Provider, {initialState} from './util/provider';
import LanguageProvider from '../src/App/hoc/language';
import Game from '../src/App/game';

import * as GameActions from '../src/store/brisca/actions';

let GameWithLanguage = (props) => {
	return (<LanguageProvider><Game {...props} /></LanguageProvider>);
}

export default () => {
	storiesOf('Game Page', module)
	.addDecorator((bundle) => {
		const {story, state = {}, action = null} = bundle();		
		return <Provider story={story()} 
			state={initialState()} 
			onMount={(reduxStore) => {
				let store = reduxStore;
				setTimeout((function() {					
					if (action) {
						this.store.dispatch(action);
					}	
				}).bind({store}), 1000);
			}} />;
	})
	.add('loading', (props) => {
		return { 
			story: () => <GameWithLanguage {...props} params={{gameId: "not loaded"}}/> 
		} 
	})
	.add('waiting', (props) => {
		return { 
			story: () => <GameWithLanguage {...props} params={{gameId: "2"}} /> ,
		};
	})		
	.add('waiting init', (props) => {
		return { 
			story: () => <GameWithLanguage {...props} params={{gameId: "2"}} /> ,
			action: GameActions.gameReceive("2", (initialState()).briscas.games["first"])
		};
	})			
	.add('game', (props) => {
		return { 
			story: () => <GameWithLanguage {...props} params={{gameId: "play"}} /> 
		};
	})
	.add('game init', (props) => {
		return { 
			story: () => <GameWithLanguage {...props} params={{gameId: "loading"}} /> ,
			action: GameActions.gameReceive("loading", (initialState()).briscas.games["first"])
		};
	})	
	.add('game turn', (props) => {
		return { 
			story: () => <GameWithLanguage {...props} params={{gameId: "first"}} /> ,
			action: GameActions.gameReceive("first", (initialState()).briscas.games["play"])
		};
	})		
	.add('game opponent turn', (props) => {
		return { 
			story: () => <GameWithLanguage {...props} params={{gameId: "play"}} /> ,
			action: GameActions.gameReceive("play", (initialState()).briscas.games["opponent"])
		};
	})			
	.add('loading to opponent turn', (props) => {
		return { 
			story: () => <GameWithLanguage {...props} params={{gameId: "loading"}} /> ,
			action: GameActions.gameReceive("loading", (initialState()).briscas.games["opponent"])
		};
	})				
	.add('last deck card', (props) => {
		return { 
			story: () => <GameWithLanguage {...props} params={{gameId: "lastDraw"}} /> ,
			action: GameActions.gameReceive("lastDraw", (initialState()).briscas.games["noDeck"])
		};
	})					
	.add('last hand', (props) => {
		return { 
			story: () => <GameWithLanguage {...props} params={{gameId: "lastHand"}} /> ,
			action: GameActions.gameReceive("lastHand", (initialState()).briscas.games["win"])
		};
	})						
}
