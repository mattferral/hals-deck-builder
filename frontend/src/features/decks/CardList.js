import React from "react";
import { ListGroup } from "reactstrap";

import CardItem from "./CardListItem";

const CardList = ({ cards, type }) => {
  
  return (
    <>
      <h2 className="text-white">{type}</h2>
      <ListGroup>
        {!!cards.length && cards.map(card => (
            <CardItem
              cardObj={card}
              key={card.id}
              type={type}
            />
        ))}
      </ListGroup>
    </>
  );
};

export default CardList;