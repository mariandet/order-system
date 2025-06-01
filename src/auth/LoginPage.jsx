import React, { useState } from "react";
import "./Login.css";

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username === "user" && password === "user@123") {
      onLoginSuccess();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2>Welcome Back</h2>

        <input
          type="text"
          placeholder="user"
          value={username}
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
          required
        />


        <input
          type="password"
          placeholder="user@123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}
