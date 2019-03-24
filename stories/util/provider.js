import React, { Component } from "react";
import { createProvider, Provider as ReduxProvider } from "react-redux";
import { browserHistory } from "react-router";
import configureStore from "../../src/store/configureStore";

const documentImpl = document;
let { head, createElement, getElementById } = documentImpl;
createElement = createElement.bind(documentImpl);
getElementById = getElementById.bind(documentImpl);

export default ({ story, state = {} }) => {
  return new class extends Component {
    store = configureStore([], state);
    provider = createProvider();

    componentDidMount() {
      if (this.props.onMount) {
        this.props.onMount(this.store);
      }

      if (getElementById("locale-script") == null) {
        const localeScript = createElement("script");
        localeScript.src =
          "https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en";
        localeScript.id = "locale-script";
        head.appendChild(localeScript);
      }

      if (getElementById("font-awesome-link") == null) {
        const fontAwesome = createElement("link");
        fontAwesome.href =
          "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css";
        fontAwesome.rel = "stylesheet";
        fontAwesome.id = "font-awesome-link";
        head.appendChild(fontAwesome);
      }

      if (!document.body.classList.contains("ltr")) {
        document.body.classList.add("ltr");
      }
      // <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en" defer></script>
      // <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    }
    render() {
      let withStore = React.cloneElement(story, { reduxStore: this.store });
      let NewProvider = this.provider;
      return <NewProvider store={this.store}>{withStore}</NewProvider>;
    }
  }();
};

export const initialState = () => {
  return {
    briscas: {
      games: {
        first: {
          id: "first",
          status: "STARTED",
          lifeCard: 25,
          players: [
            {
              id: "fb",
              next: "MR_ROBOT_e90f520b",
              hand: [15, 28, 21],
              points: 0
            },
            {
              id: "MR_ROBOT_e90f520b",
              next: "fb",
              hand: [12, 7, 30],
              points: 0
            }
          ],
          tableOwner: "fb",
          nextToPlay: "fb",
          table: [],
          lastTable: [],
          cardsLeft: 34,
          isGameEnded: false
        },
        play: {
          id: "play",
          status: "STARTED",
          lifeCard: 25,
          players: [
            { id: "fb", next: "MR_ROBOT_e90f520b", hand: [15, 21], points: 0 },
            {
              id: "MR_ROBOT_e90f520b",
              next: "fb",
              hand: [12, 7, 30],
              points: 0
            }
          ],
          tableOwner: "fb",
          nextToPlay: "MR_ROBOT_e90f520b",
          table: [{ player_id: "fb", card: 28 }],
          lastTable: [],
          cardsLeft: 34,
          isGameEnded: false
        },
        opponent: {
          id: "opponent",
          status: "STARTED",
          lifeCard: 25,
          players: [
            {
              id: "fb",
              next: "MR_ROBOT_e90f520b",
              hand: [15, 21, 33],
              points: 0
            },
            {
              id: "MR_ROBOT_e90f520b",
              next: "fb",
              hand: [12, 30, 9],
              points: 0
            }
          ],
          tableOwner: "fb",
          nextToPlay: "MR_ROBOT_e90f520b",
          table: [],
          lastTable: [
            { player_id: "fb", card: 28 },
            {
              player_id: "MR_ROBOT_e90f520b",
              card: 7
            }
          ],
          cardsLeft: 32,
          isGameEnded: false
        },
        lastDraw: {
          id: "lastDraw",
          status: "STARTED",
          lifeCard: 25,
          players: [
            {
              id: "fb",
              next: "MR_ROBOT_e90f520b",
              hand: [15, 21, 33],
              points: 62
            },
            {
              id: "MR_ROBOT_e90f520b",
              next: "fb",
              hand: [3, 6],
              points: 51
            }
          ],
          tableOwner: "fb",
          nextToPlay: "MR_ROBOT_e90f520b",
          table: [
            {
              player_id: "MR_ROBOT_e90f520b",
              card: 39
            }            
          ],
          lastTable: [
            { player_id: "fb", card: 21 },
            {
              player_id: "MR_ROBOT_e90f520b",
              card: 8
            }
          ],
          cardsLeft: 2,
          isGameEnded: false
        },
        noDeck: {
          id: "noDeck",
          status: "STARTED",
          lifeCard: 25,
          players: [
            {
              id: "fb",
              next: "MR_ROBOT_e90f520b",
              hand: [21, 33, 38],
              points: 72
            },
            {
              id: "MR_ROBOT_e90f520b",
              next: "fb",
              hand: [3, 6, 25],
              points: 51
            }
          ],
          tableOwner: "fb",
          nextToPlay: "fb",
          table: [],
          lastTable: [
            {
              player_id: "MR_ROBOT_e90f520b",
              card: 39
            },
            { player_id: "fb", card: 15 }
          ],
          cardsLeft: 0,
          isGameEnded: false
        },
        lastHand: {
          id: "lastHand",
          status: "STARTED",
          lifeCard: 25,
          players: [
            {
              id: "fb",
              next: "MR_ROBOT_e90f520b",
              hand: [21],
              points: 59
            },
            {
              id: "MR_ROBOT_e90f520b",
              next: "fb",
              hand: [],
              points: 59
            }
          ],
          tableOwner: "fb",
          nextToPlay: "MR_ROBOT_e90f520b",
          table: [
            {
              player_id: "MR_ROBOT_e90f520b",
              card: 7
            }            
          ],
          lastTable: [
            {
              player_id: "MR_ROBOT_e90f520b",
              card: 3
            },
            { player_id: "fb", card: 6 },
          ],
          cardsLeft: 0,
          isGameEnded: false
        },
        win: {
          id: "win",
          status: "STARTED",
          lifeCard: 25,
          players: [
            {
              id: "fb",
              next: "MR_ROBOT_e90f520b",
              hand: [],
              points: 66
            },
            {
              id: "MR_ROBOT_e90f520b",
              next: "fb",
              hand: [],
              points: 59
            }
          ],
          tableOwner: "fb",
          nextToPlay: "MR_ROBOT_e90f520b",
          table: [],
          lastTable: [
            { player_id: "fb", card: 21 },
            {
              player_id: "MR_ROBOT_e90f520b",
              card: 7
            }
          ],
          rounds: [],
          cardsLeft: 0,
          isGameEnded: true
        },

        "2": {
          id: "2",
          status: "WAITING",
          lifeCard: 31,
          players: [{ id: "fb", next: "fb", hand: [], points: 0 }],
          tableOwner: "1656085231318336521",
          nextToPlay: "1656085231318336521",
          table: [],
          lastTable: [],
          cardsLeft: 40,
          isGameEnded: false
        }
      }
    },
    member: {
      users: {
        fb: { name: "Pedro Cardona" }
        // "MR_ROBOT_e90f520b": {},
      }
    },
    auth: {
      id: "fb"
    }
  };
};
