import React, { Component } from 'react';
import Dropdown from "wix-style-react/Dropdown";
import Button from "wix-style-react/Button";

import { mapCardToImage } from "../../game/library";

const decks = [
	{
	  id: "fournier",
	  value: "Original Fournier"
	},
	{
	  id: "1993",
	  value: "Retro 1993"
	},
	{
	  id: "unity",
	  value: "Gypsy Cards"
	}
];
  
export default class extends Component {
	constructor(props) {
		super(props);
		const { deckId } = this.props;
		this.state = {
			selected: deckId || "unity"
		}
	}
	render = () => {
		const { savePreferences, error, message } = this.props;
		const { selected } = this.state;
		let select = null;
		let onClick = () => {
			savePreferences({ deck: select.value });
		};
		return (
			<div className="inventory-deck-card">
				<div className="inventory-deck-header">Select deck</div>
				<div className="inventory-deck-content">
					<div className="inventory-deck-placeholder" />
					<img src={mapCardToImage(0, selected)} />
				</div>
				<div className="inventory-deck-footer">
					<Dropdown
						ref={(component) => { select = component; }}
						onSelect={ (e) => { this.setState((state) => { return { selected: e.id}}) }}
						options={ decks }
						selectedId={selected}
					/>
					<Button onClick={onClick}>Save </Button>
				</div>
			</div>
		);
	}
}