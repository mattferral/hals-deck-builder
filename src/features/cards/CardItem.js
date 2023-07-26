import React from "react";

import { Card, CardBody, CardText } from "reactstrap";
import Mana from "../../common/Mana";

const CardItem = ({ cardObj }) => {
  const { name, manaCost, imageUrl, amt } = cardObj;


  return (
    <>
      <Card>
        <CardBody>
          <CardText>
             {amt ? `${amt}x ` : <></>} {name}
             <Mana mana={manaCost} />
          </CardText>
          
        </CardBody>
      </Card>
    </>
  );
};

export default CardItem;