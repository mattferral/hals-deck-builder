import React from "react";

const Mana = ({ mana, style, className }) => {

  return (
    <>
      {mana && mana.split(/\W/).map(symbol => (
        <>
          {symbol.match(/\w+/i)
            ?
              <img
                src={`/images/colors/${symbol}.svg`}
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