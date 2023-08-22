const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'please add a title']
  },
  description: {
    type: String,
    required: [true, 'please add a description']
  },
  ingredients: {
    type: [String],
    required: [true, 'please add a ingredients']
  },
  instructions: {
    type: String,
    required: [true, 'please add an instuctions']
  },
  prepTime: {
    type: String,
    required: false
  },
  cookTime: {
    type: String,
    required: false
  },
  servings: {
    type: String,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  
},
{

    timestamps: true,
    }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
