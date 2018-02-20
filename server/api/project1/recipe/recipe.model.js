import mongoose from 'mongoose';
let Schema = mongoose.Schema;

// This schema represents the ingredient of the recipe
let IngredientSchema = Schema({
  name: {type: String, required: true},
  amount: {type: Number, required: true},
  unit: {type: String, required: true}
});

let recipeSchema = Schema({

  Name: {type: String, required: true},
  Description: {type: String, required: true},
  PictureURL: {type: String, required: true},
  PrepTime: {type: Number, required: true},
  CookingTime: {type: Number, required: true},
  Direction: {type: [String], required: true},
  Ingredients: IngredientSchema,
  UserReviews: {type: [Schema.Types.ObjectId], ref: 'Review'}
});

let Recipe = mongoose.model('Recipe', recipeSchema);


export {Recipe};
