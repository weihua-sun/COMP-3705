import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './recipesDetail.routes';

export class RecipeDetailController {
  /*@ngInject*/
  constructor($routeParams, Recipe) {
    this.Recipe = Recipe;
    this.$routeParams = $routeParams;
    this.getRecipeData();
  }

  getRecipeData() {
    this.Recipe.getRecipeById(this.$routeParams.id)
      .then(response => {
        this.recipe = response;
      })
      .catch(error => {
        console.error(error);
      });
  }

  $onInit() {

  }
}

export default angular.module('comp3705App.recipeDetail', [ngRoute])
  .config(routing)
  .component('recipeDetail', {
    template: require('./recipeDetail.html'),
    controller: RecipeDetailController,
    controllerAs: 'recipeDetailController'
  })
  .name;
