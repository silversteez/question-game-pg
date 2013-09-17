myApp.factory('game', function ($rootScope, socket) {
  var game = {};
  game.gameState = null;
  game.question = null;
  game.cycleTime = null;
  game.cycleTotalTime = null;

  socket.on('cycleUpdate', function(data) {
    if (game.gameState !== data.gameState) {
      game.gameState = data.gameState;
      game.cycleTotalTime = data.cycleTotalTime;
    }
    if (data.question && game.question !== data.question) {
      game.question = data.question;
    }
    //updata cycleTime every update
    game.cycleTime = data.cycleTime;
    console.log(game.gameState);
  });

  socket.on('newQuestion', function(data) {
  });

  game.submitAnswer = function(answerObj) {
    socket.emit('submitAnswer', answerObj);
  };

  return game;
});