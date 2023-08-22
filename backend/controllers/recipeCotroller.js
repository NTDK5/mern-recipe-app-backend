const asyncHandler = require('express-async-handler');
const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');

//@desc Get Recipes
//@route GET /api/recipes
//private
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({ user: req.user.id });
  res.status(200).json(recipes);
});

//@desc Set Recipes
//@route POST /api/recipes
//private
const setRecipe = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add a title');
  }
  if (!req.body.description) {
    res.status(400);
    throw new Error('Please add a description');
  }
  if (!req.body.ingredients) {
    res.status(400);
    throw new Error('Please add a ingredients');
  }
  if (!req.body.instructions) {
    res.status(400);
    throw new Error('Please add a instructions');
  }

  const recipe = await Recipe.create({
    user: req.user.id,
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    // image: req.body.image,
    prepTime: req.body.prepTime,
    cookTime: req.body.cookTime,
    servings: req.body.servings,
  });

  res.status(200).json(recipe);
});

//@desc Update Recipes
//@route PUT /api/recipes/:id
//private
const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(400);
    throw new Error('Recipe not found');
  }

  if (recipe.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedRecipe);
});

//@desc Delete Recipes
//@route DELETE /api/recipes/:id
//private
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(400);
    throw new Error('Recipe not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (recipe.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await recipe.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getRecipes,
  setRecipe,
  updateRecipe,
  deleteRecipe,
};