'use strict';

function StartCtrl($scope,navSvc,game) {
  $scope.game = game;

  $scope.slidePage = function (path,type) {
    navSvc.slidePage(path,type);
  };

}


