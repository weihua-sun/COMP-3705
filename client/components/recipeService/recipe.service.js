
'use strict';

export function RecipeService($resource) {
  'ngInject';
  var Recipe = {
    getAllRecipes() {
      return $resource('/api/recipes/').query().$promise;
    },
    getRecipeById(recipeId) {
      return $resource('/api/recipes/:id').get({id: recipeId}).$promise;
    },

    updateRecipe(recipe) {
      let updateResource = $resource('/api/recipes/:id', null,
        {
          update: { method: 'PUT' }
        });
      return updateResource.update({ id: recipe._id }, recipe).$promise;
    },
    createUser(user) {
      return $resource('/api/users').save(user).$promise;
    },

    deleteRecipe(userId) {
      return $resource('api/users/:id').delete({id: userId}).$promise;
    }


  };
  return Recipe;
}
