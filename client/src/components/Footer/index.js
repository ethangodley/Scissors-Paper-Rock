import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../App.css";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="container center">
      <div>
        {location.pathname !== '/' && (
          <button
            className="btn"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4 className ="copyright">&copy; {new Date().getFullYear()} - Rock Paper Scissors</h4>
      </div>
    </footer>
  );
};

export default Footer;
