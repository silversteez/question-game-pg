'use strict';

function QuestionCtrl($rootScope,$scope,game,user,navSvc) {

  $scope.game = game;
  $scope.user = user;//why is this needed just to make the user.points $watch work?

  $scope.data = {};

  $scope.data.displayName = user.username || 'Guest';
  $scope.data.displayPoints = user.points;
  $scope.data.canSubmitAnswer = true;
  $scope.data.answerSubmitted = false;
  $scope.data.transToAnswer = false;
  $scope.data.clientState = null;
  $scope.data.answer = null;

  $scope.progressBarVal = 100;
  //message can change depending on game state
  $scope.progressBarMsg = "Submit your answer before time's up!";
  //update progress bar
  $scope.$watch('game.cycleTime', function() {
    if ($scope.game.gameState !== 'transition') {
      $scope.progressBarVal = $scope.game.cycleTime / $scope.game.cycleTotalTime * 100;
    }
  });

  $scope.$watch('user.points', function() {
    console.log("watching user points");
    if (user.points > $scope.data.displayPoints) {
      $scope.scoreInterval = setInterval(increasePointsByOne, 500);
    }
  });

  var increasePointsByOne = function() {
    $scope.data.displayPoints++;
    // console.log("increasing by one");
    if ($scope.data.displayPoints >= user.points) {
      clearInterval($scope.scoreInterval);
    }
  };

  var checkUserAnswer = function() {
    for (var i = 0; i < game.answers.length; i++) {
      var answer = game.answers[i];
      console.log("user answer: ", $scope.data.answer, " vs ", answer.content);
      if ($scope.data.answer === answer.content) {
        user.points += answer.points;
        user.savePoints(user.points);
      }
    }
    console.log(user.points, typeof user.points);
  };

  $scope.$watch('game.gameState', function() {
    if ($scope.game.gameState === 'transition') {
      $scope.data.clientState = "showAnswer";
      $scope.progressBarMsg = "Time until next question...";
      $scope.data.canSubmitAnswer = false;
      $scope.data.answerSubmitted = false;
      $scope.data.transToAnswer = true;
    } else if ($scope.game.gameState === 'answer') {
      checkUserAnswer();
      $scope.data.transToAnswer = false;
      $scope.data.canSubmitAnswer = false;
      $scope.data.answerSubmitted = false;
    } else { //in question state
      $scope.data.clientState = "showQuestion";
      $scope.data.transToAnswer = false;
      $scope.data.answerSubmitted = false;
      $scope.data.canSubmitAnswer = true;
      $scope.progressBarMsg = "Submit your answer before time's up!";
    }
  });

  $scope.submitAnswer = function() {
    var answerObj = {
      username: user.username,
      answer: $scope.data.answer
    };
    console.log('answerObj is ', answerObj);
    game.submitAnswer(answerObj);
    //$scope.data.answerform.$setPristine();
    $scope.data.canSubmitAnswer = false;
    $scope.data.answerSubmitted = true;
  };
}
