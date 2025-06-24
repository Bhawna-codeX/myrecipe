import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import RecipeCard from './components/Recipecard';
import RecipeForm from './components/Recipeform';
import Auth from './components/Auth';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editRecipe, setEditRecipe] = useState(null);

  useEffect(() => {
    fetchRecipes();
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and set user
      fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const fetchRecipes = async (query = '') => {
    const url = query
      ? `http://localhost:5000/api/recipes/search?query=${encodeURIComponent(query)}`
      : 'http://localhost:5000/api/recipes';
    const res = await fetch(url);
    const data = await res.json();
    setRecipes(data);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    fetchRecipes(e.target.value);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar user={user} handleSignOut={handleSignOut} />
      {!user && <Auth setUser={setUser} />}
      <div className="my-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search recipes by dish name..."
          className="w-full p-2 border rounded"
        />
      </div>
      {user && (
        <button
          onClick={() => { setShowForm(!showForm); setEditRecipe(null); }}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          {showForm ? 'Cancel' : 'Add Recipe'}
        </button>
      )}
      {showForm && user && (
        <RecipeForm
          user={user}
          setRecipes={setRecipes}
          editRecipe={editRecipe}
          setShowForm={setShowForm}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            user={user}
            setRecipes={setRecipes}
            setEditRecipe={setEditRecipe}
            setShowForm={setShowForm}
          />
        ))}
      </div>
    </div>
  );
};

export default App;