import angular from 'angular';
const ngRoute = require('angular-route');

export class NewUserController {
  /*@ngInject*/
  constructor($uibModalInstance, User) {
    this.User = User;
    this.$uibModalInstance = $uibModalInstance;
  }
  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
  submitForm() {
    this.User.createUser(this.user)
      .then(response => {
        this.formInfo = 'Successfully created user ' + response._id;
      })
      .catch(err => {
        console.error(err);
        this.formError = err.data.errmsg;
      });
  }
}

export default angular.module('comp3705App.newUser', [ngRoute])
  .controller('newUserController', NewUserController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
