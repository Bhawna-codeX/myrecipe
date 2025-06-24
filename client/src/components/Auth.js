import React, { useState } from 'react';

const Auth = ({ setUser }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [authData, setAuthData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleAuth = async () => {
    const url = isSignUp
      ? 'http://localhost:5000/api/auth/signup'
      : 'http://localhost:5000/api/auth/signin';
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
    }
    setAuthData({ email: '', password: '' });
  };

  return (
    <div className="border p-4 rounded mb-4 mx-auto max-w-md">
      <h2 className="text-xl font-bold mb-2">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <div className="mb-2">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={authData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="e.g., user@example.com"
        />
      </div>
      <div className="mb-2">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={authData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Password"
        />
      </div>
      <button
        onClick={handleAuth}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="text-blue-500 mt-2"
      >
        Switch to {isSignUp ? 'Sign In' : 'Sign Up'}
      </button>
    </div>
  );
};

export default Auth;