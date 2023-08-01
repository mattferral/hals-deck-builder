import React from "react";

const Mana = ({ mana, size, className }) => {

  return (
    <div className={className}>
      {mana && mana.split(/\W/).map(symbol => (
        <>
          {symbol.match(/\w+/i)
            ?
              <img
                src={`/images/colors/${symbol}.svg`}
                style={size ? {width: size} : {width: '2rem'}}
                
              />
            :
              <></>}
        </>
      ))}
    </div>
  );

};

export default Mana;