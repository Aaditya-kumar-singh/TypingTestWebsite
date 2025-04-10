import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
       
        <span>Typing Test</span>
      </Link>

      <div className="navbar-links">
        {user ? (
          <>
            <Link 
              to="/" 
              className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Practice
            </Link>
            <Link 
              to="/multiplayer" 
              className={`navbar-link ${location.pathname === '/multiplayer' ? 'active' : ''}`}
            >
              Multiplayer
            </Link>
            <div className="navbar-user">
              <img src={user.profilePic || '/default-avatar.png'} alt={user.name} />
              <span>{user.name}</span>
            </div>
            <button className="navbar-button secondary" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/" 
              className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Practice
            </Link>
            <Link 
              to="/multiplayer" 
              className={`navbar-link ${location.pathname === '/multiplayer' ? 'active' : ''}`}
            >
              Multiplayer
            </Link>
            <Link to="/login" className="navbar-button primary">
              Login
            </Link>
            <Link to="/signup" className="navbar-button secondary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
