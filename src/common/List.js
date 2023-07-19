import React from "react";

import { CardGroup } from "reactstrap";

import DeckCard from '../features/decks/DeckCard';

const List = ({ items }) => {

  return (
    <>
      <CardGroup
        className="m-5"
      >
        {items.map(item => 
          <DeckCard deck={item}/>
        )}
      </CardGroup>
    </>
  );
};

export default List;