import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  /*@ngInject*/
  constructor($http, User, Recipe) {
    this.$http = $http;
    this.User = User;
    this.Recipe = Recipe;
    this.setData();
    this.getUserData();
    this.getRecipeData();
  }

  setData() {
    this.values = ['first', 'second', 'third'];
    this.valueToSquare = 4;
  }

  getUserData() {
    this.User.getAllUsers()
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  getRecipeData() {
    this.Recipe.getAllUsers()
      .then(response => {
        this.recipes = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

}
export function UserService($http) {
  'ngInject';
  var User = {
    getAllUsers() {
      return $http.get('/api/User/');
    }
  }
  return User;
}

export function RecipeService($http) {
  'ngInject';
  var Recipe = {
    getAllUsers() {
      return $http.get('/api/Recipe/');
    }
  }
  return Recipe;
}


export function SquareFilter() {
  var squareFunction = function(value) {
    return value * value;
  }
  return squareFunction;
}

export default angular.module('comp3705App.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainController'
  })
  .service('User', UserService)
  .service('Recipe', RecipeService)
  .filter('Square', SquareFilter)
  .name;

