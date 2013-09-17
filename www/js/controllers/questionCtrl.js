'use strict';

function QuestionCtrl($scope,game,navSvc) {

  $scope.game = game;

  $scope.answerSubmitted = false;
  $scope.inTransitionState = false;
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
      $scope.inTransitionState = true;
    } else if ($scope.game.gameState === 'answer') {
      $scope.progressBarMsg = "Time until next question...";
      $scope.displayResults = true;
    } else { //in question state
      $scope.progressBarMsg = "Submit your answer before time's up!";
    }
  });

  $scope.submitAnswer = function() {
    var answerObj = {
      answer: $scope.answer,
    };
    game.submitAnswer(answerObj);

    $scope.answerform.$setPristine();
    $scope.answerSubmitted = true;
  };

  $scope.dismissResults = function() {
    $scope.displayResults = false;
  };
}
