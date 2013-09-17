'use strict';

function StartCtrl($scope,$rootScope,navSvc,socket) {
  $rootScope.question = {};
  // $rootScope.gameState = null;
  // $rootScope.question.text = null;
  // $rootScope.question.time = null;
  // $rootScope.question.timeRemaining = null;

  $scope.slidePage = function (path,type) {
    navSvc.slidePage(path,type);
  };

  socket.on('cycleUpdate', function(data) {
    $rootScope.gameState = data.gameState;
    if (data.question) {
      $rootScope.question.text = data.question;
    }
  });

  socket.on('newQuestion', function(data) {
    $rootScope.question.text = data.question;
    $rootScope.question.time = data.cycleTotalTime;
    $rootScope.question.timeRemaining = data.cycleTime;
  });

  //destroy listeners when scope is destroyed to prevent duplicate listeners
  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });
}


