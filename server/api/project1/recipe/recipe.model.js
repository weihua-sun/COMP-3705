import mongoose from 'mongoose';
let Schema = mongoose.Schema;

/*
  This section declares the schemas for the different documents
  that will be used
 */

// This schema represents the address of the user
let IngredientSchema = Schema({
  name: {type: String, required: true},
  amount: {type: Number, required: true},
  unit: {type: String, required: true}
});

let recipeSchema = Schema({

  Name: {type: String, required: true},
  Description: {type: String, required: true},
  PictureURL: {type: String, requried: true},
  PrepTime: {type: String, required: true},
  CookingTime: {type: String, required: true},
  Direction: {type: [String]},
  Ingredients: IngredientSchema,
  UserReviews: {type: [Schema.Types.ObjectId]}
});

// This schema represents the name of the user
let reviewsSchema = Schema({
  // firstName is a simple String type that is required
  ReviewDescription: {type: String, required: true},
  // middleName is a simple String type that is not required
  ReviewRating: {type: String, required: false},
  // lastName is a simple String type that is required
  Date: {type: String, required: true},
  UserCreatingReview: {type:Schema.Types.ObjectId}
});

// This is the main user schema
let userSchema = Schema({
  // Age is a simple number type that is required
  FullName: {type: String, required: true},

  Username: {type: String, unique: true},

  EmailAddress: {type: String, unique: true}
});

/*
  This section creates interactive models from the defined schemas
  above so that you can perform Create Read Update and Delete (CRUD)
  operations against the schemas.
  NOTE since the nameSchema is embedded within userSchema, it does NOT have
  to be created as a model!
 */
let Address = mongoose.model('Address', addressSchema);
let User = mongoose.model('User', userSchema);

// Export the two created models, Address and User
export {Address, User};
