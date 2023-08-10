import React from "react";
import { ListGroup } from "reactstrap";

import DeckListItem from "./DeckListItem";

const DeckList = ({ cards, type }) => {
  
  return (
    <>
      <h2 className="text-white">{type}</h2>
      <ListGroup>
        {!!cards.length && cards.map(card => (
            <DeckListItem
              cardObj={card}
              key={card.id}
              type={type}
            />
        ))}
      </ListGroup>
    </>
  );
};

export default DeckList;