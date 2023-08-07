import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup, List, } from "reactstrap";

import CardSearch from "../search/CardSearch";
import CardList from "./CardList";

const Deck = () => {
  const { id } = useParams();

  const deckState = useSelector(st => st.decks[id]);

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
      <h1 className="text-light">{deckState.name}</h1>
        {Object.keys(deckList).map(key => (
          <div key={key}>
            {!!deckList[key].length && 
              <ListGroup>
                <CardList cards={deckList[key]} />
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