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

  socket.on('transToAnswser', function(data) {
    game.gameState = data.gameState;
  });

  socket.on('answers', function(data) {
    // game.answers = data.answers;
  });

  game.submitAnswer = function(answerObj) {
    socket.emit('submitAnswer', answerObj);
  };

  return game;
});