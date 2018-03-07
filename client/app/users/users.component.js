import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './users.routes';
import {UserService} from '../main/main.component';

export class UsersController {
  /*@ngInject*/
  constructor($routeParams, $http, User) {
    this.$routeParams = $routeParams;
    this.$http = $http;
    this.User = User;
    this.getUserData();
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
  .name
