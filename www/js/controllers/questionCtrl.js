'use strict';

function QuestionCtrl($scope,$rootScope,socket,game) {

  $scope.answerSubmitted = false;
  $scope.cycleTime = null;
  $scope.cycleTimeRemaining = null;
  $scope.questionBarVal = 100;

  //message can change depending on game state
  $scope.progressBarMsg = "Submit your answer before time's up!";
  //update progress bar
  $scope.$watch('cycleTimeRemaining', function() {
    $scope.questionBarVal = $scope.cycleTimeRemaining / $scope.cycleTime * 100;
  });

  //listen for question events
  socket.on('newQuestion', function(data) {
    $rootScope.question.text = data.question;
    $scope.cycleTime = data.cycleTime;
    $scope.answerSubmitted = false;
  });

  socket.on('cycleUpdate', function(data) {
    if (data.gameState === 'question') {
      $scope.cycleTime = data.cycleTime;
      $scope.cycleTimeRemaining = data.cycleTimeRemaining;
    }
  });

  $scope.submitAnswer = function() {
    var answerObj = {
      answer: $scope.answer,
      username: $rootScope.username
    };
    socket.emit('submitAnswer', answerObj);
    $scope.answerform.$setPristine();
    $scope.answerSubmitted = true;
    console.log('submitted Answer!');
  };

  //destroy listeners when scope is destroyed to prevent duplicate listeners
  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });

}
