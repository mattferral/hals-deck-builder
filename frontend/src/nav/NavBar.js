import React, { useContext } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

//import UserContext from '../common/UserContext';

const NavBar = ({ logout }) => {

  const user = undefined //useContext(UserContext);

  //const history = useHistory();

  const handleLogout = () => {
    logout();
    //history.push('/');
  };

  return (
    <>
      <Navbar expand="md" color="black">
        <Nav>
          <NavLink
            className="navbar-brand text-white text-decoration-none"
            to='/'
          >
            Home
          </NavLink>
          <NavItem className="me-4">
            <NavLink
              className="nav-link text-white text-decoration-none"
              to="/decks"
            >
              Decks
            </NavLink>
          </NavItem>
        </Nav>
        
        <Nav>
          {user &&
            <>
              <NavItem className="me-4">
                <NavLink
                  className="nav-link text-white text-decoration-none"
                  to="/profile"
                >
                  Profile
                </NavLink>
              </NavItem>
              
              <button
                className='me-4 nav-link text-white'
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          }

          {!user &&
            <>
              <NavItem className="me-4">
                <NavLink
                  className="nav-link text-white text-decoration-none"
                  to="/login"
                >
                  Login
                </NavLink>
              </NavItem>
              <NavItem className="me-4">  
                <NavLink
                  className="nav-link text-white text-decoration-none"
                  to="/signup"
                >
                  Sign Up
                </NavLink>
              </NavItem>
            </>
          }
          
        </Nav>
      </Navbar>
    </>
  );
};

export default NavBar;