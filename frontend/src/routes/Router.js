import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import Decks from '../features/decks/Decks';
import Deck from '../features/decks/Deck';
import Login from '../auth/Login';
import SignUp from '../auth/SignUp';
import UserProfile from '../users/UserProfile';
import Rankings from '../users/Rankings';

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/decks" element={<Decks />} />
      <Route exact path="/decks/:id" element={<Deck />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/profile" element={<UserProfile />} />
      <Route exact path="/rankings" element={<Rankings />} />
    </Routes>
  );
};

export default Router;