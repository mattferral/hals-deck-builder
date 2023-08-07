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
  Input,
  InputGroup,
  ListGroupItem,
  Row
} from "reactstrap";

import Mana from "../../common/Mana";

const CardListItem = ({ cardObj }) => {
  const { manaCost, imageUrl, amt, duplicateLimit } = cardObj;
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

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
                disabled={amt < 2}
                outline
              >
                - 
              </Button>
                {` ${amt||1}x `}
              <Button
                size="sm"
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