import { createSlice } from '@reduxjs/toolkit';
import slugify from 'slugify';

import deckModel from '../../models/deckModel';

const initialState = {
  [slugify("Sliver Horde")]: {
    ...deckModel,
    id: slugify("Sliver Horde"),
    name: "Sliver Horde",
    colors: ["B", "W", "R", "U", "G"],
    format: "commander",
    backgroundImg: undefined
  },
  [slugify("other")]: {
    ...deckModel,
    id: slugify("other"),
    name: "other",
    colors: ["B"],
    backgroundImg: undefined
  }
};

/** Deck slice */

export const deckSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    newDeck: (state, action) => {
      const name = action.payload;
      const id = slugify(name.toLowerCase());

      state[id] = {
        ...deckModel,
        id,
        name,
      }
    },

    addRemoveCard: (state, action) => {
      const { id, cardObj, method } = action.payload;
      const { types } = cardObj;
      const deck = state[id];
      
      // This if block should be a helper function
      let type;
      if (types.includes("Creature"))
        type = "Creature";
      else if (types.includes("Land"))
        type = "Land"
      else if(types.includes("Enchantment"))
        type = "Enchantment"
      else
        type = types[0];
      
      if (method === "ADD") {
        cardObj.amt = 1;
        deck.deckList[type.toLowerCase()].push(cardObj);
        deck.cardCount++;
      } else if (method === "REMOVE") {
        deck.deckList[type.toLowerCase()] = deck.deckList[type.toLowerCase()].filter(card => card.id !== cardObj.id);
        deck.cardCount--;
      }
    },

    addLand: (state, action) => {
      const { id, land } = action.payload;
      const deck = state[id];

      deck.basicLands[land.toLowerCase()]++;
      deck.cardCount++;
    },

    sideboardCard: (state, action) => {
      const { id, cardObj } = action.payload;
      const deck = state[id];

      deck.sideboard.push(cardObj);
    },

    setCommander: (state, action) => {
      const { id, type, commander } = action.payload;
      const deck = state[id];
      let currentCommander = deck.deckList.commander;

      if (currentCommander.length)
        deck.deckList.creature.push(currentCommander[0]);
      deck.deckList.commander = [commander];
      deck.colors = commander.colors.join();

      deck.deckList[type] = deck.deckList[type].filter(card => card.id !== commander.id)
    },

    setFormat: (state, action) => {
      const { id, format } = action.payload;
      const deck = state[id];

      switch (format.toLowerCase()) {
        case "standard":
          deck.minCount = 60;
          deck.duplicateLimit = 4;
          deck.deckList.commander = [];
          break;
        case "commander":
          deck.minCount = 100;
          deck.duplicateLimit = 1;
          break;
      }
      deck.format = format;
    },

    changeCardAmt: (state, action) => {
      const { id, cardId, type, amt } = action.payload;
      const card = state[id].deckList[type].find(card => card.id === cardId);
      
      card.amt += amt;
    }
  }
});

// Export action creators
export const {
  newDeck,
  addRemoveCard,
  addLand,
  sideboardCard,
  setCommander,
  setFormat,
  changeCardAmt,
} = deckSlice.actions;

// Export deck reducer
export default deckSlice.reducer;
