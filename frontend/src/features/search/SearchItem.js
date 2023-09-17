import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Card, CardBody, CardText, ListGroupItem } from "reactstrap";

import Mana from "../../common/Mana";
import { addRemoveCard } from "../decks/deckSlice";
import CardName from "../../common/CardName";

const SearchItem = ({ cardObj }) => {
  const { manaCost, imageUrl, amt } = cardObj;
  const { id } = useParams();
  const deckState = useSelector(st => st.decks[id]);
  const dispatch = useDispatch();

  let disabled = false;
  
  for (let type of cardObj.types) {
    if (deckState.deckList[type.toLowerCase()].find(card => card.name === cardObj.name))
      disabled = true;
  }

  const addCard = () => {
    dispatch(addRemoveCard({
      id,
      cardObj,
      method: "ADD"
    }))
  };


  return (
    <ListGroupItem
      className="w-75 m-1 border-0 bg-transparent"
    >
      <Card className="bg-dark">
        <CardBody className="row">
          <CardText className="col text-light">
            <CardName
              name={cardObj.name}
              imageUrl={imageUrl}
            />
          </CardText>
          
          {manaCost &&
            <Mana mana={manaCost} className="col" size="1.5rem" />
          }
          
          <ButtonGroup
            className="col"
          >
            <Button
              disabled={disabled}
              onClick={() => addCard()}            
            >
              Add
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
    </ListGroupItem>
  );
};

export default SearchItem;