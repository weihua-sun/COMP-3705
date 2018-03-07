
import angular from 'angular';
const uiBootstrap = require('angular-ui-bootstrap');
import user from '../../components/userService/user.module';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  /*@ngInject*/
  constructor($http, $uibModal, User, $scope) {
    this.$http = $http;
    this.User = User;
    this.$uibModal = $uibModal;
    this.setData();
    this.getUserData();
    this.rating($scope);
  }

  setData() {
    this.values = ['first', 'second', 'third'];
    this.valueToSquare = 4;
  }

  getUserData() {
    this.User.getAllUsers()
      .then(response => {
        this.users = response;
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateUser(userr) {
    this.$uibModal.open({
      template: require('../../components/updateUserModal/updateUserModal.html'),
      controller: 'updateUserController as updateUserController',
      resolve: {
        user: () => userr
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

}

export function SquareFilter() {
  var squareFunction = function(value) {
    return value * value;
  }
  return squareFunction;
}

export default angular.module('comp3705App.main', [ngRoute, uiBootstrap, user])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainController'
  })
  .filter('Square', SquareFilter)
  .name;
