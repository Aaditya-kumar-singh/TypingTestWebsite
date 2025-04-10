import React from 'react';
import Login from '../components/Login';
import '../styles/Login.css';

export default function LoginPage({ setUser }) {
  return (
    <div className="login-page">
      <Login setUser={setUser} />
    </div>
  );
} 