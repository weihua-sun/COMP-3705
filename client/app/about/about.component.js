import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './about.routes';

export class AboutController {

  /*@ngInject*/
  constructor($routeParams, appConfig) {
    this.$routParams = $routeParams;
    this.author = appConfig.author;
  }

  $onInit() {
    if(this.$routParams.somethingToPrint) {
      this.valueEntered = true;
      this.somethingToPrint = this.$routParams.somethingToPrint;
    } else {
      this.valueEntered = false;
    }
  }

}

export default angular.module('comp3705App.about', [ngRoute])
  .config(routing)
  .component('about', {
    template: require('./about.html'),
    controller: AboutController,
    controllerAs: 'aboutController'
  })
  .name;
