'use strict';

function LoginCtrl($scope,myApi) {

    var submitted = function(data) {
        console.log("submitted fired! ", data);
    };

    $scope.submit = function() {
        var user = {
            email: $scope.data.email,
            password: $scope.data.password
        };
        myApi.signup(user, submitted);
        console.log('submitfunc!');
    };
}