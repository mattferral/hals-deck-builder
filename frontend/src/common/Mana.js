import React from "react";

const Mana = ({ mana, size, className }) => {
  const symbols = typeof(mana) === "string"
    ?
      mana.split(/[{}]+/).filter(symbol => symbol.match(/\w+/)).sort()
    :
      mana;

  return (
    <div className={className}>
      {symbols.map((color, idx) => (
        <img
          src={`/images/colors/${color.replace(/[/]/g, '').toUpperCase()}.svg`}
          style={size ? {width: size} : {width: '2rem'}}
          key={`${color}-${idx}`}
        />
      ))}
    </div>
  );

};

export default Mana;