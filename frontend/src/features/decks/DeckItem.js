import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  ListGroupItem,
  Row,
} from "reactstrap";

import Mana from "../../common/Mana";
import {
  changeCardAmt,
  setCommander,
  addRemoveCard,
} from "./deckSlice";
import CardName from "../../common/CardName";
import DeckItemDropDown from "./DeckItemDropdown";
import CardAmtControls from "./CardAmtControls";

const DeckItem = ({ cardObj, type }) => {
  const { manaCost, name, imageUrl, amt } = cardObj;

  const { id } = useParams();
  const { duplicateLimit, format } = useSelector(st => st.decks[id]);

  const dispatch = useDispatch();
  
  const changeAmt = (amt) => {
    dispatch(changeCardAmt({
      id,
      cardId: cardObj.id,
      type,
      amt,
    }))
  };

  const changeCommander = () => {
    dispatch(setCommander({
      id,
      type,
      commander: cardObj
    }))
  };

  const removeCard = () => {
    dispatch(addRemoveCard({
      id,
      cardObj,
      method: "REMOVE",
    }))
  };


  return (
    <ListGroupItem
      className="w-50 m-1 border-0 bg-dark text-light"
    >
      <Row>   
        <Col className="col-2">
          <CardAmtControls
            changeAmt={changeAmt}
            amt={amt}
            duplicateLimit={duplicateLimit}
          />
        </Col>

        <Col className="col-4">
          <CardName
            name={name}
            imageUrl={imageUrl}
          />
        </Col>

        <Col className="col-2">
          <Mana mana={manaCost} className="col" size="1.5rem" />
        </Col>

        <Col className="col-1">
          <DeckItemDropDown
            changeCommander={changeCommander}
            removeCard={removeCard}
            type={type}
            format={format}
          />
        </Col>
      </Row>
     
    </ListGroupItem>
  );
};

export default DeckItem;