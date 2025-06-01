import React, { useState } from 'react';
import LoginPage from './auth/LoginPage'; // your login component
import HomePage from './HomePage';   // your main app

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return isLoggedIn ? <HomePage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />;
}
