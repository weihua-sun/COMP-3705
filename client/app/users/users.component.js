import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './users.routes';
import {UserService} from '../main/main.component';


export class UsersController {
  /*@ngInject*/
  constructor($routeParams, $http, User, $scope, $uibModal) {
    this.$routeParams = $routeParams;
    this.$http = $http;
    this.User = User;
    this.$uibModal = $uibModal;
    this.getUserData();
    this.rating($scope);
    this.tab($scope);
   // this.updateUser();
  }

  getUserData() {
    this.User.getUserById(this.$routeParams.id)
      .then(response => {
        this.user = response.data;
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


  $onInit() {
    if(this.$routeParams.id) {
      this.valueEntered = true;
      this.id = this.$routeParams.id;
    } else {
      this.valueEntered = false;
    }
  }

}

export default angular.module('comp3705App.users', [ngRoute])
  .config(routing)
  .component('users', {
    template: require('./users.html'),
    controller: UsersController,
    controllerAs: 'usersController'
  })
  .service('User', UserService)
  .name;
