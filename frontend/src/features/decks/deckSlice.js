import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import deckModel from '../../models/deckModel';

const initialState = [
  {
    ...deckModel,
    id: uuid(),
    name: "Sliver Horde",
    colors: "{B}{W}{R}{U}{G}",
    format: "commander",
    backgroundImg: undefined
  },
  {
    ...deckModel,
    id: uuid(),
    name: "other",
    colors: "{B}",
    backgroundImg: undefined
  }
];

/** Deck slice */

export const deckSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    newDeck: (state, action) => {
      state.push({
        ...deckModel,
        id: uuid(),
        name: action.payload,
      })
    },
    addCard: (state, action) => {
      const { name, card, types } = action.payload;
      let type;
      if (types.includes("Creature"))
        type = "Creature";
      else if (types.inclues("Land"))
        type = "Land"
      else if(types.includes("Enchantment"))
        type = "Enchantment"
      else
        type = types[0];
      
      state[name].deckList[type.toLowerCase()].push(card);
    },
    addLand: (state, action) => {
      const { name, land } = action.payload;
      state[name].basicLands[land.toLowerCase()] += 1;
      state[name].cardCount += 1;
    },
    sideboardCard: (state, action) => {
      const { name, card } = action.payload;
      state[name].sideboard.push(card);
    },
    setCommander: (state, action) => {
      const { name, commander } = action.payload;
      if (!state[name].commander)
        state[name].cardCount += 1;
      state[name].commander = commander;
      state[name].colors = commander.colors;
    },
    setFormat: (state, action) => {
      const { name, format } = action.payload;
      switch (format.toLowerCase()) {
        case "standard":
          state[name].minCount = 60;
          state[name].duplicateLimit = 4;
          state[name].deckList.commander = undefined;
          break;
        case "commander":
          state[name].minCount = 100;
          state[name].duplicateLimit = 1;
          break;
      }
      state[name].format = format;
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
