import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const DeckItemDropDown = ({changeCommander, removeCard, type, format}) => {
  return (
    <>
      <UncontrolledDropdown>
        <DropdownToggle caret className="">Edit</DropdownToggle>
        <DropdownMenu>
          {type === "creature" &&
            format === "commander" && 
            <DropdownItem
              onClick={() => changeCommander()}
            >
              Make commander
            </DropdownItem>
          }
          <DropdownItem
            onClick={() => removeCard()}>
              Remove
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default DeckItemDropDown;