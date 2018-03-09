
import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './recipes.routes';
//import {RecipeService} from '/../main/main.component';
import {RecipeService} from '../../components/recipeService/recipe.service';


export class RecipesController {
  /*@ngInject*/
  constructor($routeParams, Recipe, $scope, $uibModal) {
    this.$routeParams = $routeParams;
    this.Recipe = Recipe;
    this.$uibModal = $uibModal;
    this.getRecipeData();
    this.rating($scope);
    this.tab($scope);
    // this.updateRecipe();
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

  updateRecipe(recipe) {
    this.$uibModal.open({
      template: require('../../components/updateRecipeModal/updateRecipeModal.html'),
      controller: 'updateRecipeController as updateRecipeController',
      resolve: {
        recipe: () => recipe
      }
    });
  }

  rating($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };
  }

  tab($scope) {
    $scope.tabs = [
      { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
      { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
    ];

    $scope.model = {
      name: 'Tabs'
    };
  }


  /*$onInit() {
    if(this.$routeParams.id) {
      this.valueEntered = true;
      this.id = this.$routeParams.id;
    } else {
      this.valueEntered = false;
    }
  }
  */

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

