import React, { useState, useEffect } from 'react';

const RecipeForm = ({ user, setRecipes, editRecipe, setShowForm }) => {
  const [formData, setFormData] = useState({
    dishName: '',
    prepTime: '',
    ingredients: '',
    steps: '',
  });

  useEffect(() => {
    if (editRecipe) {
      setFormData({
        dishName: editRecipe.dishName,
        prepTime: editRecipe.prepTime,
        ingredients: editRecipeIngredients.join('\n'),
        steps: editRecipe.steps.join('\n'),
      });
    }
  }, [editRecipe]);

  const handleChange = (e) => {
    setFormData({ ...formData,
      [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const data = {
      dishName: formData.dishName,
      prepTime: Number(formData.prepTime),
      ingredients: formData.ingredients.split('\n').filter(Boolean),
      steps: formData.steps.split('\n').filter(Boolean),
    };

    const url = editRecipe
      ? `http://localhost:5000/api/recipes/${editRecipe._id}`
      : 'http://localhost:5000/api/recipes';
    const method = await fetch(url, {
      method: editRecipe ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const newRecipe = await res.json();
    setRecipes(prev => editRecipe
      ? prev.map(r => r._id === newRecipe._id ? newRecipe : r)
      : [...prev, newRecipe]);
    setShowForm(false);
    setFormData({
      dishName: '',
      prepTime: '',
      ingredients: '',
      steps: '',
    });
  };

  return (
    <div className="border p-4 rounded mb-4">
      <h2 className="text-xl font-bold mb-2">{editRecipe ? 'Edit Recipe' : 'Add Recipe'}</h2>
      <div className="mb-2">
        <label for="Dish Name:">Dish Name:</label>
          <input
            type="text"
            name="dishName"
            value={formData.dishName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., Chicken Curry"
          />
      </div>
      <div className="mb-2">
        <label>Prep Time (minutes):</label>
        <input
          type="number"
          name="prepTime"
          value={formData.prepTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="e.g., 30"
        />
      </div>
      <div className="mb-2">
        <label for="Ingredients">Ingredients (one per line):</label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="e.g.,\nChicken\nOnion\nGarlic"
          rows="4"
        />
      </div>
      <div className="mb-2">
        <label for="Steps">Steps (one per line):</label>
        <textarea
          name="steps"
          value={formData.steps}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="e.g.,\nChop onion\nCook chicken"
          rows="4"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-green-500 text-white"
      >
        Save Recipe
      </button>
    </div>
  );
};

export default RecipeForm;