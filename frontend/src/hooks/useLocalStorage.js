import React, { useEffect, useState } from "react";

const useLocalStorage = (key, defaulValue) => {

  const [state, setState] = useState(() => {
    let value = window.localStorage.getItem(key) || defaulValue;
    return value;
  });

  useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [state]);

  return [state, setState];
};

export default useLocalStorage;