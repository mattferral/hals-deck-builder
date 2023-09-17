import React from "react";
import { v4 as uuid } from "uuid";
import { UncontrolledTooltip } from "reactstrap";

const CardName = ({name, imageUrl}) => {
  const id = "name-" + uuid();
  return (
    <>
      <a id={id} rel="noreferrer">
        {name}
      </a>
      <UncontrolledTooltip
        target={id}
        placement="right"
        autohide={false}
      >
        <a
          href={imageUrl}
          target="_blank"
          rel="noopener"
        >
          <img src={imageUrl} alt={name} />
        </a>
      </UncontrolledTooltip>
    </>
  );
};

export default CardName;