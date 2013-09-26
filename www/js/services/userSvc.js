myApp.factory('user', function (socket) {
  var storage = window.localStorage;
  var user = {};

  user.saveUserNameAndPassword = function(name, pw) {
    storage.setItem('username', name);
    storage.setItem('password', pw);
  };

  if (storage.getItem('username') !== null) {
    user.username = storage.getItem('username');
    console.log('user.username is: ', user.username);
  }

  return user;
});