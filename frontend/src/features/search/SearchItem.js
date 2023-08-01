import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Card, CardBody, CardText, ListGroupItem } from "reactstrap";
import Mana from "../../common/Mana";

const SearchItem = ({ cardObj }) => {
  const { manaCost, imageUrl, amt } = cardObj;

  const { name } = useParams();
  const deckState = useSelector(st => st.decks.find(deck => deck.name === name));
  const dispatch = useDispatch();


  return (
    <ListGroupItem
      className="w-50 m-1 border-0 bg-transparent"
    >
      <Card className="bg-dark">
        <CardBody className="row">
          <CardText className="col text-light">
             {amt ? `${amt}x ` : null} {cardObj.name}
          </CardText>

          <Mana mana={manaCost} className="col" size="1.5rem" />

          <ButtonGroup
            className="col"
          >
            <Button>Add</Button>
          </ButtonGroup>
        </CardBody>
      </Card>
    </ListGroupItem>
  );
};

export default SearchItem;