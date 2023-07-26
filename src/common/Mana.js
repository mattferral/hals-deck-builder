import React from "react";

const Mana = ({ mana, style, className }) => {

  return (
    <>
      {mana.split("").map(char => (
        <>
          {char.match(/\d/) ? `(${char}) ` : <></>}
          {char.match(/[a-z]/i)
            ?
              <img
                src={`/images/colors/${char}.png`}
                style={style ? style : {width: '2rem'}}
                className={className ? className : undefined}
              />
            :
              <></>}
        </>
      ))}
    </>
  );

};

export default Mana;