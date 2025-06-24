const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
    trim: true
  },
  prepTime: {
    type: Number,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  steps: {
    type: [String],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);