'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

const ngRoute = require('angular-route');

import uiBootstrap from 'angular-ui-bootstrap';

import {
  routeConfig
} from './app.config';

import main from './main/main.component';
import userDetail from './userDetail/userDetail.component';
import about from './about/about.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import users from './users/users.component';
import recipes from './recipes/recipes.component';
import updateRecipeModal from '../components/updateRecipeModal/updateRecipeModal.controller';
//import user from '../components/userService/user.module';
import newUser from '../components/newUserModal/newUser.controller';
import updateUserModal from '../components/updateUserModal/updateUserModal.controller';
import updateReviewModal from '../components/updateReviewModal/updateReviewModal.controller';
import newRecipe from '../components/newRecipeModal/newRecipe.controller';
import './app.scss';

angular.module('comp3705App', [ngCookies, ngResource, ngSanitize, ngRoute, uiBootstrap, main, about, userDetail, constants, util, users, recipes, newRecipe /*, user*/, newUser, updateUserModal, updateRecipeModal, updateReviewModal])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['comp3705App'], {
      strictDi: true
    });
  });
