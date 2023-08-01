import React from "react";

const Mana = ({ mana, size, className }) => {
  const colors = mana.split(/\W/).filter(char => char.match(/\w+/)).sort();

  return (
    <div className={className}>
      {colors.map(color => (
        <img
          src={`/images/colors/${color}.svg`}
          style={size ? {width: size} : {width: '2rem'}}
          key={color}
        />
      ))}
    </div>
  );

};

export default Mana;