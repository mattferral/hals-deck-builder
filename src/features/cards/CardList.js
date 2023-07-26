import React from "react";

import CardItem from "./CardItem";

const CardList = ({ cards }) => {

  return (
    <>
      {cards.length && cards.map(card => (
        <>
          <CardItem cardObj={card}/>
        </>
      ))}
    </>
  );
};

export default CardList;