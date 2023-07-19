import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import Decks from '../features/decks/Decks';

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route exact path="/decks" element={<Decks />}/>
    </Routes>
  );
};

export default Router;