'use strict';

import Recipe from './project1/recipe/recipe.model';
//import Review from './project1/Review/review.model';

// Find
export function index(req, res) {
  Recipe.find()
    .populate('UserReviews')
    .exec()
    .then(function(recipe) {
      res.json(recipe);
    })
    .catch(function(err) {
      res.status(500);
      res.send(err);
    });
}

// Find details
export function show(req, res) {
  Recipe.findById(req.params.id)
    .populate('UserReviews')
    .exec()
    .then(function(existingRecipe) {
      if(existingRecipe) {
        res.status(200);
        res.json(existingRecipe);
      } else {
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}


export function create(req, res) {
  let recipe = req.body;
  Recipe.create(recipe)
    .then(function(createdRecipe) {
      res.status(201);
      res.json(createdRecipe);
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}


export function update(req, res) {
  var updatedRecipe;
  Recipe.findById(req.params.id)
    .exec()
    .then(function(existingRecipe) {
      if(existingRecipe) {
        existingRecipe.name = req.body.name;
        existingRecipe.Description = req.body.Description;
        existingRecipe.PictureURL = req.body.PictureURL;
        existingRecipe.PrepTime = req.body.PrepTime;
        existingRecipe.CookingTime = req.body.CookingTime;
        existingRecipe.Direction = req.body.Direction;
        existingRecipe.Ingredients.name = req.body.Ingredients.name;
        existingRecipe.Ingredients.amount = req.body.Ingredients.amount;
        existingRecipe.Ingredients.unit = req.body.Ingredients.unit;

        updatedRecipe = existingRecipe;
        return Promise.all([
          existingRecipe.increment().save()
        ]);
      } else {
        return null;
      }
    })
    .then(function(savedObjects) {
      if(savedObjects) {
        res.status(200);
        res.json(updatedRecipe);
      } else {
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Remove
export function destroy(req, res) {
  Recipe.findById(req.params.id)
    .populate('UserReviews')
    .exec()
    .then(function(existingRecipe) {
      if(existingRecipe) {
        return Promise.all([
          existingRecipe.UserReviews.remove(),
          existingRecipe.remove()
        ]);
      } else {
        return null;
      }
    })
    .then(function(deletedRecipe) {
      if(deletedRecipe) {
        res.status(204).send();
      } else {
        // User was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

