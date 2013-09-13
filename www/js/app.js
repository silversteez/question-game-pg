'use strict';

function jsonp_callback(data) {
    // returning from async callbacks is (generally) meaningless
    console.log(data.found);
}


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','ajoslin.mobile-navigate','ngMobile'])
    .constant('serverRoute', 'http://questiongame.jit.su:80')
    .config(function ($compileProvider){
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/homeView.html', controller: 'HomeCtrl'});
        $routeProvider.when('/notification', {templateUrl: 'partials/notificationView.html'});
        $routeProvider.when('/geolocation', {templateUrl: 'partials/geolocationView.html'});
        $routeProvider.when('/contacts', {templateUrl: 'partials/contactsView.html'});
        $routeProvider.when('/hackerNews', {templateUrl: 'partials/hackerNewsView.html'});
        $routeProvider.otherwise({redirectTo: '/'});
  }]);
