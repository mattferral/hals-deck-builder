import React from "react";
import { ListGroup } from "reactstrap";

import SearchItem from "./SearchItem";

const SearchList = ({ cards, className }) => {
  
  return (
    <ListGroup className={className} >
      {!!cards.length && cards.map(card => (
          <SearchItem cardObj={card} key={card.id} />
      ))}
    </ListGroup>
  );
};

export default SearchList;