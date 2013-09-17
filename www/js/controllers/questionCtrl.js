'use strict';

function QuestionCtrl($scope,socket,myApi) {

  $scope.answerSubmitted = false;
  $scope.cycleTime = null;
  $scope.cycleTimeRemaining = null;
  $scope.questionBarVal = 100;

  var submitted = function(data) {
    console.log("submitted fired! ", data);
  };

  //update progress bar
  $scope.$watch('cycleTimeRemaining', function() {
    console.log("time remains: ", $scope.cycleTimeRemaining);
    $scope.questionBarVal = $scope.cycleTimeRemaining / $scope.cycleTime * 100;
  });

  $scope.submitAnswer = function() {
    var answer = {
      answer: $scope.answer,
    };
    socket.emit('submitAnswer', answer);
    // $scope.answerSubmitted = true;
    $scope.answerform.$setPristine();
    console.log('submitted Answer!');
  };

  $scope.connected = 'awaiting connection...'
  socket.on('connected', function() {
    $scope.connected = 'connected!';
  });

  //listen for question events
  socket.on('nextQuestion', function(data) {
    $scope.question = data.question;
    $scope.cycleTime = data.cycleTime;
    $scope.answerSubmitted = false;
  });

  socket.on('cycleUpdate', function(data) {
    console.log(data);
    $scope.cycleTime = data.cycleTime;
    $scope.cycleTimeRemaining = data.cycleTimeRemaining;
  });

  //destroy listeners when scope is destroyed to prevent duplicate listeners
  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });

}
