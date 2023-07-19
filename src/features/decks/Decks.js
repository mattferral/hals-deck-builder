import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import List from '../../common/List';
import { newDeck } from './deckSlice';

const Decks = () => {

  const deckState = useSelector(st => Object.values(st.decks));

  return (
    <>
      <List items={deckState}/>
    </>
  );
};

export default Decks;