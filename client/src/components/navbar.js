import React from 'react';

const Navbar = ({ user, handleSignOut }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Recipe Sharing Platform</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.email}</span>
            <button onClick={handleSignOut} className="bg-red-500 p-2 rounded">
              Sign Out
            </button>
          </>
        ) : (
          <span>Sign in to add recipes</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;