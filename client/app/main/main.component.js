import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  /*@ngInject*/
  constructor($http, $uibModal, User, Recipe, $scope) {
    this.$http = $http;
    this.User = User;
    this.$uibModal = $uibModal;
   // this.$resource = $resource;
    this.Recipe = Recipe;
    this.$scope = $scope;
    this.getUserData();
    this.getRecipeData();
    this.collapse($scope);
  }

  getUserData() {
    this.User.getAllUsers()
      .then(response => {
        this.users = response;
      })
      .catch(error => {
        console.error(error);
      });
    this.User.getUserById()
      .then(response => {
        this.users = response;
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
    this.Recipe.getRecipeById()
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
    }).result
      .then(() => {
        this.getUserData();
      })
      .catch(() => {
        this.getUserData();
      });
  }

  deleteUser(userId) {
    this.User.getUserById(userId)
      .then(response => {
        this.user = response;
      })
      .catch(error => {
        console.error(error);
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
    }).result
      .then(() => {
        this.getRecipeData();
      })
      .catch(() => {
        this.getRecipeData();
      });
  }

  deleteRecipe(recipeId) {
    this.User.getUserById(recipeId)
      .then(response => {
        this.user = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  collapse($scope) {
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;
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

  $onInit() {
  }

}

/*export function UserService($http) {
  'ngInject';
  var User = {
    getAllUsers() {
      return $http.get('/api/users/');
    },
    getUserById(userId) {
      return $http.get('/api/users/' + userId);
    },

    createUser(user) {
      return $http.post('/api/users', user);
    },

    updateUser(userId) {
      return $http.put('/api/users/' + userId);
    },

    deleteUser(userId) {
      return $http.delete('/api/users' + userId);
    }

  };
  return User;
}


/*export function UserService($resource) {
  'ngInject';
  var User = {
    getAllUsers() {
      return $resource('/api/users/').query().$promise;
    },
    getUserById(userId) {
      return $resource('/api/users/:id').get({id: userId}).$promise;
    },

    app.factory("Post", function($resource) {
  return $resource("/api/posts/:id", {}, {
    query: { method: "GET", isArray: false }
  });
});
    updateUser(user) {
      let updateResource = $resource('/api/users/:id', null,
        {
          update: { method: 'PUT' }
        });
      return updateResource.update({ id: user._id }, user).$promise;
    },

    createUser(user) {
      return $resource('/api/users').save(user).$promise;
    }

  };
  return User;
}
*/

export function RecipeService($http) {
  'ngInject';
  var Recipe = {
    getAllRecipe() {
      return $http.get('/api/recipes/');
    },

    getRecipeById(recipeId) {
      return $http.get('/api/recipes/' + recipeId);
    },

    createRecipe(recipe) {
      return $http.post('/api/recipes', recipe);
    },

    updateRecipe(recipeId) {
      return $http.put('/api/recipes/' + recipeId);
    },

    deleteRecipe(recipeId) {
      return $http.delete('/api/recipes' + recipeId);
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
  //.service('User', UserService)
  .service('Recipe', RecipeService)
  .name;

