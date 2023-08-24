import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Router from './routes/Router';
import NavBar from './nav/NavBar';
import DeckBuilderApi from './common/api';
import UserContext from './common/UserContext';
import useLocalStorage from './hooks/useLocalStorage';


function App() {
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useLocalStorage('token', '');

  const [user, setUser] = useState(undefined);


  const getToken = async (user) => {
    let token = await DeckBuilderApi.login(user);
    setToken(token);
  };

  const signup = async (user) => {
    let token = await DeckBuilderApi.signup(user);
    setToken(token);
  };

  const logout = () => {
    setToken('');
    setUser(undefined);
  };

  useEffect(() => {
    const getUser = async (token) => {
      const decoded = jwt_decode(token);
      DeckBuilderApi.token = token;
      try {
        let user = await DeckBuilderApi.getUser(decoded.username);
        setUser(user);
      } catch (e) {
        setUser(undefined);
      }
    };
    if (token)
      getUser(token);
    setLoading(false);
  }, [token]);

  console.log(user);

  
  return (
    <div>
      <UserContext.Provider value={{ user, signup, logout, getToken }}>
        <BrowserRouter>
          <NavBar/>
          {!loading && 
            <Router />
          }
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
