import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup, List, } from "reactstrap";

import CardSearch from "../search/CardSearch";
import SearchList from "../search/SearchList";

const Deck = () => {
  const { name } = useParams();

  const deckState = useSelector(st => st.decks.find(deck => deck.name === name));

  const {
    format,
    colors,
    maxCount,
    cardCount,
    duplicateLimit,
    deckList,
    sideboard,
    basicLands,
  } = deckState;
  console.log(deckState);

  return (
    <>
      <h1 className="text-light">{name}</h1>
        {Object.keys(deckList).map(key => (
          <div key={key}>
            {!!deckList[key].length && 
              <ListGroup>
                <SearchList cards={deckList[key]} />
              </ListGroup>
            }
          </div>
        ))}
      

      <CardSearch 
        deck={deckState}
      />
    </>
  );
};

export default Deck;