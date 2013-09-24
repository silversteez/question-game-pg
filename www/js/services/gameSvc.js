myApp.factory('game', function ($rootScope, socket) {
  var game = {};
  game.gameState = null;
  game.question = null;
  game.cycleTime = null;
  game.cycleTotalTime = null;
  game.answers = [
  {rank:1,content:"blahblah",points:"10 pts"},
  {rank:2,content:"blahblah",points:"10 pts"},
  {rank:3,content:"blahblah",points:"10 pts"},
  {rank:4,content:"blahblah",points:"10 pts"},
  {rank:5,content:"blahblah",points:"10 pts"}
  ];

  var updateGameState = function (state, cycleTotalTime) {
    //only update if it's changed (so we don't update $scope constantly)
    if (game.gameState !== state) {
      game.gameState = state;
      game.cycleTotalTime = cycleTotalTime;
    }
  };

  socket.on('cycleUpdate', function(data) {
    updateGameState(data.gameState, data.cycleTotalTime);
    //updata cycleTime every update
    game.cycleTime = data.cycleTime;
    console.log(game.gameState);
  });

  socket.on('newQuestion', function(data) {
    updateGameState(data.gameState, data.cycleTotalTime);
    game.question = data.question;
  });

  socket.on('transToAnswser', function(data) {
    updateGameState(data.gameState, data.cycleTotalTime);
  });

  socket.on('answers', function(data) {

    updateGameState(data.gameState, data.cycleTotalTime);
    game.answers = data.answers;
  });

  game.submitAnswer = function(answerObj) {
    socket.emit('submitAnswer', answerObj);
  };

  return game;
});