import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ListGroupItem,
  Row
} from "reactstrap";

import Mana from "../../common/Mana";
import { changeCardAmt } from "./deckSlice";

const CardListItem = ({ cardObj, type }) => {
  const { manaCost, imageUrl, amt } = cardObj;

  const { id } = useParams();
  const { duplicateLimit } = useSelector(st => st.decks[id]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const dispatch = useDispatch();
  
  const changeAmt = (amt) => {
    dispatch(changeCardAmt({
      id,
      cardId: cardObj.id,
      type,
      amt,
    }))
  };


  return (
    <ListGroupItem
      className="w-50 m-1 border-0 bg-dark text-light"
    >
      <Row>   
        {duplicateLimit !== 1
          ? 
          <Col className="col-2">
              <Button
                size="sm"
                onClick={() => changeAmt(-1)}
                disabled={amt < 2}
                outline
              >
                - 
              </Button>
                {` ${amt||1}x `}
              <Button
                size="sm"
                onClick={() => changeAmt(1)}
                disabled={amt === duplicateLimit}
                outline
              >
                +
              </Button>
          </Col>
          : 
            null}

        <Col className="co-4">{cardObj.name}</Col>

        <Col className="col-3">
          <Mana mana={manaCost} className="col" size="1.5rem" />
        </Col>

        <Col className="col-1">
          <Dropdown isOpen={dropdownOpen} toggle={toggle} className="">
            <DropdownToggle caret>Edit</DropdownToggle>
            <DropdownMenu>
              {cardObj.types.includes("Creature") && 
                <DropdownItem>Make commander</DropdownItem>
              }
              <DropdownItem color="danger">Remove</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
     
    </ListGroupItem>
  );
};

export default CardListItem;