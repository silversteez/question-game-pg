'use strict';

var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','ajoslin.mobile-navigate','ngMobile'])
    // .constant('serverRoute', 'http://questiongame.jit.su:80')
    .constant('serverRoute', 'http://localhost:3000')
    .config(function ($compileProvider){
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/homeView.html'});
        $routeProvider.when('/login', {templateUrl: 'partials/loginView.html'});
        $routeProvider.when('/question', {templateUrl: 'partials/questionView.html'});
        $routeProvider.when('/answer', {templateUrl: 'partials/answerView.html'});
        $routeProvider.when('/notification', {templateUrl: 'partials/notificationView.html'});
        $routeProvider.when('/geolocation', {templateUrl: 'partials/geolocationView.html'});
        $routeProvider.when('/contacts', {templateUrl: 'partials/contactsView.html'});
        $routeProvider.when('/hackerNews', {templateUrl: 'partials/hackerNewsView.html'});
        $routeProvider.otherwise({redirectTo: '/'});
  }]);
