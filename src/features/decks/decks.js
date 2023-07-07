import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

import deckModel from "../../../deckModel";

const initialState = [];

/** Deck slice */

const deckSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    deckAdded(state, action) {
      state.decks.push({
        ...deckModel,
        id: uuid(),
      })
    },
  }
});

// Export action creators
export const { deckAdded } = deckSlice.actions;

// Export deck reducer
export default deckSlice.reducer;
