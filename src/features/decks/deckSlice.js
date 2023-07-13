import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import deckModel from '../../models/deckModel';

const initialState = [];

/** Deck slice */

export const deckSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    newDeck: (state) => {
      state.push({
        ...deckModel,
        id: uuid(),
      })
    },
  
  }
});

// Export action creators
export const { newDeck } = deckSlice.actions;

// Export deck reducer
export default deckSlice.reducer;
