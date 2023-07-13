import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Home";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}/>
    </Routes>
  );
};

export default Router;