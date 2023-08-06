import { createSlice } from '@reduxjs/toolkit';
import slugify from 'slugify';

import deckModel from '../../models/deckModel';

const initialState = {
  [slugify("Sliver Horde")]: {
    ...deckModel,
    name: "Sliver Horde",
    colors: "{B}{W}{R}{U}{G}",
    format: "commander",
    backgroundImg: undefined
  },
  [slugify("other")]: {
    ...deckModel,
    name: "other",
    colors: "{B}",
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

      state[slugify(name)] = {
        ...deckModel,
        name,
      }
    },

    addCard: (state, action) => {
      const { name, cardObj } = action.payload;
      const { types } = cardObj;
      const deck = state[slugify(name)];

      let type;
      if (types.includes("Creature"))
        type = "Creature";
      else if (types.inclues("Land"))
        type = "Land"
      else if(types.includes("Enchantment"))
        type = "Enchantment"
      else
        type = types[0];
      
      deck.deckList[type.toLowerCase()].push(cardObj);
      deck.cardCount++;
    },

    addLand: (state, action) => {
      const { name, land } = action.payload;
      const deck = state[slugify(name)];

      deck.basicLands[land.toLowerCase()]++;
      deck.cardCount++;
    },

    sideboardCard: (state, action) => {
      const { name, cardObj } = action.payload;
      const deck = state[slugify(name)];

      deck.sideboard.push(cardObj);
    },

    setCommander: (state, action) => {
      const { name, commander } = action.payload;
      const deck = state[slugify(name)];

      if (!deck.commander)
        deck.cardCount += 1;
      deck.commander = commander;
      deck.colors = commander.colors;
    },

    setFormat: (state, action) => {
      const { name, format } = action.payload;
      const deck = state[slugify(name)];

      switch (format.toLowerCase()) {
        case "standard":
          deck.minCount = 60;
          deck.duplicateLimit = 4;
          deck.deckList.commander = undefined;
          break;
        case "commander":
          deck.minCount = 100;
          deck.duplicateLimit = 1;
          break;
      }
      deck.format = format;
    },
  }
});

// Export action creators
export const {
  newDeck,
  addCard,
  addLand,
  sideboardCard,
  setCommander,
  setFormat,
} = deckSlice.actions;

// Export deck reducer
export default deckSlice.reducer;
