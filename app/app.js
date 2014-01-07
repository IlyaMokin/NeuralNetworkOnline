'use strict';

var ONLINENETWORK = angular.module('ONLINENETWORK', ["ngRoute"],function () {
}).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

		$locationProvider.html5Mode(false);
		$routeProvider.when('/home', { templateUrl: 'views/networkconstructor.htm' });

		$routeProvider.otherwise({ redirectTo: '/home'  });
	} ]);

