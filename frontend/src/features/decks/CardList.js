import React from "react";
import { ListGroup } from "reactstrap";

import CardItem from "./CardListItem";

const CardList = ({ cards, className }) => {
  
  return (
    
    <ListGroup className={className}>
      {!!cards.length && cards.map(card => (
          <CardItem cardObj={card} key={card.id} />
      ))}
    </ListGroup>
  );
};

export default CardList;