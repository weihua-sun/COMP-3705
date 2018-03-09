'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider.when('/recipes', {
    template: '<recipes></recipes>'
  });

  $routeProvider.when('/recipes/:id', {
    template: '<recipes></recipes>'
  });
}
