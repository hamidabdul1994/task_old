/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */

angular = require('angular');
require('angular-route');
require('../dist/templateCachePartials');

angular.module('todomvc', ['ngRoute','todoPartials'])
	.config(function ($routeProvider, $httpProvider) {
		'use strict';

		$httpProvider.interceptors.push('tokenInjector');

		var routeConfig = {
			controller: 'TodoCtrl',
			templateUrl: '/partials/todomvc-index.html',
			resolve: {
				store: ['todoStorage', function (todoStorage) {
					// Get the correct module (API or localStorage).
					return todoStorage;
				}]
			}
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});

module.factory('todomvc', function () {
	var tokenInjector = {
		request: function (config) {
			// if (!tokenService.isAnonymus) {
			config.headers['x-session-token'] = "fdsff";//tokenService.token;
			// }
			return config;
		}
	};
	return tokenInjector;
});

require('todoCtrl');
require('todoStorage');
require('todoFocus');
require('todoEscape');
require('footer');
