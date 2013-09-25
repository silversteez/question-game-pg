'use strict';

function LoginCtrl($scope,game) {

    $scope.data = {};
    $scope.data.username = null;
    $scope.data.password = null;

    if (game.username === undefined) {
        $scope.data.showLogin = true;
    } else {
        $scope.data.showLogin = false;
    }

    $scope.submit = function() {
        game.username = $scope.data.username;
        game.password = $scope.data.password;

        $scope.data.showLogin = false;
    };
}