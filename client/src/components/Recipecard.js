import React from 'react';

const RecipeCard = ({ recipe, user, setRecipes, setEditRecipe, setShowForm }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/recipes/${recipe._id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setRecipes(prev => prev.filter(r => r._id !== recipe._id));
  };

  const handleEdit = () => {
    setEditRecipe(recipe);
    setShowForm(true);
  };

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{recipe.dishName}</h2>
      <p>Prep Time: {recipe.prepTime} minutes</p>
      <h3>Ingredients:</h3>
      <ul className="list-disc pl-5">
        {recipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <h3>Steps:</h3>
      <ol className="list-decimal pl-5">
        {recipe.steps.map((step, i) => <li key={i}>{step}</li>)}
      </ol>
      {user && user._id === recipe.userId._id && (
        <div className="mt-4 flex space-x-2">
          <button onClick={handleEdit} className="bg-yellow-500 text-white p-2 rounded">Edit
        </button>
      <button onClick={handleDelete}
 className="bg-red-500 text-white p-2 rounded">Delete
        </button>
      </div>
    )}
  </div>
);
};

export default RecipeCard;