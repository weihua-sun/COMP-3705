import angular from 'angular';
const ngRoute = require('angular-route');

export class NewRecipeController {
  /*@ngInject*/
  constructor($uibModalInstance, Recipe) {
    this.Recipe = Recipe;
    this.$uibModalInstance = $uibModalInstance;
  }
  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
  submitForm() {
    this.Recipe.createRecipe(this.recipe)
      .then(response => {
        this.formInfo = 'Successfully created recipe ' + response._id;
      })
      .catch(err => {
        console.error(err);
        this.formError = err.data.errmsg;
      });
  }
}

export default angular.module('comp3705App.newRecipe', [ngRoute])
  .controller('newRecipeController', NewRecipeController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
