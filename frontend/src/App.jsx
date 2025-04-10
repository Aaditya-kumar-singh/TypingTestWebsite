import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TextArea from './components/TextArea';
import Keyboard from './components/Keyboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import "./styles/index.css";
import CountrySelection from "./components/CountrySelection";
import Multiplayer from "./components/Multiplayer";
import TeamRoom from './components/TeamRoom';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Select",
    flag: "",
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data
      fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(err => {
        console.error('Error fetching user:', err);
        localStorage.removeItem('token');
      })
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Navbar user={user} setUser={setUser} />
        <main className="main-content">
          <Routes>
            {/* Default landing page with TextArea and Keyboard */}
            <Route 
              path="/" 
              element={
                <>
                  <TextArea />
                  <Keyboard />
                </>
              } 
            />
            {/* Auth routes */}
            <Route 
              path="/login" 
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <LoginPage setUser={setUser} />
                )
              } 
            />
            <Route 
              path="/signup" 
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <SignupPage />
                )
              } 
            />
            {/* Country Selection */}
            <Route
              path="/country"
              element={<CountrySelection setSelectedCountry={setSelectedCountry} />}
            />
            
            {/* Multiplayer with Nested Routes */}
            <Route path="/multiplayer/*" element={<Multiplayer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
