import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  /*@ngInject*/
  constructor($http, $uibModal, User, Recipe) {
    this.$http = $http;
    this.User = User;
    this.$uibModal = $uibModal;
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
    this.User.getUserById()
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error(error);
      });
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

  createUser() {
    this.$uibModal.open({
      template: require('../../components/newUserModal/newUser.html'),
      controller: 'newUserController as newUserController',
    });
  }


  updateUser(user) {
    this.$uibModal.open({
      template: require('../../components/updateUserModal/updateUserModal.html'),
      controller: 'updateUserController as updateUserController',
      resolve: {
        user: () => user
      }
    });
  }


  createRecipe() {
    this.$uibModal.open({
      template: require('../../components/newRecipeModal/newRecipe.html'),
      controller: 'newRecipeController as newRecipeController',
    });
  }

  $onInit() {
  }

}
export function UserService($http) {
  'ngInject';
  var User = {
    getAllUsers() {
      return $http.get('/api/users/');
    },

    getUserById(userId) {
      return $http.get('/api/users/' + userId);
    }

  };
  return User;
}

export function RecipeService($http) {
  'ngInject';
  var Recipe = {
    getAllRecipe() {
      return $http.get('/api/recipes/');
    },

    getRecipeById(recipeId) {
      return $http.get('/api/recipes/' + recipeId);
    }
  };
  return Recipe;
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
  .name;

