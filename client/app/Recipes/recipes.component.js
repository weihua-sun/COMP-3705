import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './recipes.routes';
import {RecipeService} from '../main/main.component';

export class RecipesController {
  /*@ngInject*/
  constructor($routeParams, $http, Recipe) {
    this.$routeParams = $routeParams;
    this.$http = $http;
    this.Recipe = Recipe;
    this.getRecipeData();
  }

  getRecipeData() {
    this.Recipe.getAllRecipe()
      .then(response => {
        this.recipes = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
  $onInit() {
    if(this.$routeParams.id) {
      this.valueEntered = true;
      this.id = this.$routeParams.id;
    } else {
      this.valueEntered = false;
    }
  }

}

export default angular.module('comp3705App.recipes', [ngRoute])
  .config(routing)
  .component('recipes', {
    template: require('./recipes.html'),
    controller: RecipesController,
    controllerAs: 'recipesController'
  })
  .service('Recipe', RecipeService)
  .name;
