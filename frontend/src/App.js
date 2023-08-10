import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from './routes/Router';
import NavBar from './nav/NavBar';


function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
