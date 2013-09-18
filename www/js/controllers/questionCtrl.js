'use strict';

function QuestionCtrl($scope,game,navSvc) {

  $scope.game = game;

  $scope.canSubmitAnswer = true;
  $scope.answerSubmitted = false;
  $scope.transToAnswer = false;
  $scope.displayResults = false;

  $scope.progressBarVal = 100;
  //message can change depending on game state
  $scope.progressBarMsg = "Submit your answer before time's up!";
  //update progress bar
  $scope.$watch('game.cycleTime', function() {
    if ($scope.game.gameState !== 'transition') {
      $scope.progressBarVal = $scope.game.cycleTime / $scope.game.cycleTotalTime * 100;
    }
  });

  $scope.$watch('game.gameState', function() {
    if ($scope.game.gameState === 'transition') {
      $scope.canSubmitAnswer = false;
      $scope.answerSubmitted = false;
      $scope.transToAnswer = true;
    } else if ($scope.game.gameState === 'answer') {
      $scope.progressBarMsg = "Time until next question...";
      $scope.transToAnswer = false;
      $scope.canSubmitAnswer = false;
      $scope.answerSubmitted = false;
      $scope.displayResults = true;
    } else { //in question state
      $scope.transToAnswer = false;
      $scope.answerSubmitted = false;
      $scope.canSubmitAnswer = true;
      $scope.progressBarMsg = "Submit your answer before time's up!";
    }
  });

  $scope.submitAnswer = function() {
    var answerObj = {
      answer: $scope.answer,
    };
    game.submitAnswer(answerObj);
    $scope.answerform.$setPristine();
    $scope.canSubmitAnswer = false;
    $scope.answerSubmitted = true;
  };

  $scope.dismissResults = function() {
    $scope.displayResults = false;
  };
}
