import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './users.routes';
import {UserService} from '../main/main.component';

export class UsersController {

  /*@ngInject*/
  constructor($routeParams, User) {
    this.$routParams = $routeParams;
    this.User = User;
  }

  $onInit() {
    if(this.$routParams.id) {
      this.valueEntered = true;
      this.id = this.$routParams.id;
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
