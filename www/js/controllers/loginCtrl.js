'use strict';

function LoginCtrl($rootScope,$scope,myApi) {

    // var submitted = function(data) {
    //     console.log("submitted fired! ", data);
    // };



    $scope.data = {};
    $scope.data.username = null;
    $scope.data.password = null;

    if ($rootScope.username === undefined) {
        $scope.data.showLogin = true;
    } else {
        $scope.data.showLogin = false;
    }

    $scope.submit = function() {
        // var user = {
        //     email: $scope.data.email,
        //     password: $scope.data.password
        // };
        // myApi.signup(user, submitted);

        $rootScope.username = $scope.data.username;
        $rootScope.password = $scope.data.password;

        $scope.data.showLogin = false;
        console.log('submit fired!');
    };
}