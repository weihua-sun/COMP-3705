
'use strict';

export function RecipeService($resource) {
  'ngInject';
  var Recipe = {
    getAllRecipes() {
      return $resource('/api/recipes/').query().$promise;
    },
    getRecipeById(recipeId) {
      //console.log(recipeId)
      return $resource('/api/recipes/:id').get({id: recipeId}).$promise;
    },
    updateRecipe(recipe) {
      //console.log(recipe._id)
      let updateResource = $resource('/api/recipes/:id', null,
        {
          update: { method: 'PUT' }
        });
      //console.log(recipe._id)
      return updateResource.update({ id: recipe._id }, recipe).$promise;
    },
    createRecipe(recipe) {
      console.log(recipe)
      return $resource('/api/recipes').save(recipe).$promise;
    },

    deleteRecipe(recipeId) {
      return $resource('api/recipes/:Id').delete({id: recipeId}).$promise;
    }
  };
  return Recipe;
}

