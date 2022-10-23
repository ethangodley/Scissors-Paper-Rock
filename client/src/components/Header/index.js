import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';
import "../../App.css";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div className="navBar">
        <Link to="/">
          <h1 className="title">
            Rock Paper Scissors
          </h1>
        </Link>
        <div className="items">
          {Auth.loggedIn() ? (
            <nav>
              <Link to="/me" className="navItem right">
                High Scores
              </Link>
              <Link className="navItem right" onClick={logout}>
                Logout
              </Link>
            </nav>
          ) : (
            <div>
              <Link className="navItem right" to="/login">
                Login
              </Link>
              <Link className="navItem right" to="/signup">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
