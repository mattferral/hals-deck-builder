import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { CardGroup } from 'reactstrap';

import DeckCard from './DeckCard';
import { newDeck } from './deckSlice';

const Decks = () => {

  const decks = useSelector(st => Object.values(st.decks));

  return (
    <>
      <CardGroup
        className="m-5"
      >
        {decks.map(deck => 
          <DeckCard
            key={deck.name}
            deck={deck}
          />
        )}
      </CardGroup>
    </>
  );
};

export default Decks;