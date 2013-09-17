'use strict';

function QuestionCtrl($scope,game) {

  $scope.game = game;

  $scope.answerSubmitted = false;
  $scope.questionBarVal = 100;

  //message can change depending on game state
  $scope.progressBarMsg = "Submit your answer before time's up!";
  //update progress bar
  $scope.$watch('game.cycleTime', function() {
    $scope.questionBarVal = $scope.game.cycleTime / $scope.game.cycleTotalTime * 100;
  });

  $scope.submitAnswer = function() {
    var answerObj = {
      answer: $scope.answer,
    };
    game.submitAnswer(answerObj);

    $scope.answerform.$setPristine();
    $scope.answerSubmitted = true;
  };

}
