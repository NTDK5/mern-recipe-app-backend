const express = require('express')
const router = express.Router()
const {getRecipes, setRecipe, updateRecipe,deleteRecipe} = require('../controllers/recipeCotroller')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getRecipes).post(protect, setRecipe)
router.route('/:id').put(protect, updateRecipe).delete(protect, deleteRecipe)


// router.get('/', getRecipes)

// router.post('/', setRecipe)

// router.put('/:id', updateRecipe)

// router.delete('/:id', deleteRecipe)


module.exports = router