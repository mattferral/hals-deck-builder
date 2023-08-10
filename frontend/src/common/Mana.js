import React from "react";

const Mana = ({ mana, size, className }) => {
  const colors = mana.split(/[{}]+/).filter(symbol => symbol.match(/\w+/)).sort();

  return (
    <div className={className}>
      {colors.map((color, idx) => (
        <img
          src={`/images/colors/${color.replace(/[/]/g, '')}.svg`}
          style={size ? {width: size} : {width: '2rem'}}
          key={`${color}-${idx}`}
        />
      ))}
    </div>
  );

};

export default Mana;