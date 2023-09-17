import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Collapse } from "reactstrap";

import CardSearch from "../search/CardSearch";
import DeckList from "./DeckList";

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

  const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = () => setShowSearch(!showSearch);

  return (
    <>
      <h1 className="text-light">{deckState.name}</h1>
      
      <Collapse
        isOpen={!showSearch}
      >
        {Object.keys(deckList).map(key => (
          <>
            {!!deckList[key].length &&
              <div key={key}>
                <DeckList cards={deckList[key]} type={key} />
              </div>
            }
          </>
        ))}
      </Collapse>
      

      <Button
        color="primary"
        onClick={toggleSearch}
      >
        Show {showSearch ? "Deck" : "Search"}
      </Button>
      
      <Collapse
        isOpen={showSearch}
      >
        <CardSearch 
          deck={deckState}
        />
      </Collapse>
      
      
    </>
  );
};

export default Deck;