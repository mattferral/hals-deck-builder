import React from "react";
import { Button } from "reactstrap";

const CardAmtControls = ({ changeAmt, duplicateLimit, amt}) => {
  return (
    <>
      {duplicateLimit !== 1
        ? 
          <>
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
          </>
        : 
          null}
    </>
  );
};

export default CardAmtControls;