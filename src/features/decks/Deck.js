import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Search from "../cards/CardSearch";

const Deck = () => {
  const { name } = useParams();

  const deckState = useSelector(st => st.decks.find(deck => deck.name === name));

  console.log(deckState);

  return (
    <>

      <Search deck={deckState}/>
    </>
  );
};

export default Deck;