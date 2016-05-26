(function () {
  'use strict';

  angular
    .module('student-portal')
    .factory("authService", authService);

  authService.$inject = ["$log", "tokenService", "$http"];

  function authService($log, token, $http) {
    $log.info("auth service loaded!");

    var service = {
      logIn:      logIn,
      isLoggedIn: isLoggedIn,
      logOut:     logOut,
      getName:    getName,
      getMyId:      getMyId
    };
    return service;

    function getName() {
      if (token.retrieve() != null) {
        return token.decode().name
      }
    }

    function getMyId() {
      if (token.retrieve() != null) {
        return token.decode()._id
      }
    }

    function isLoggedIn() {
      return (token.retrieve() != null);
    }

    function logIn(data) {
      var promise = $http({
        method: 'POST',
        url:    '/api/token',
        data:   data
      })
      .then(
        // if the request succeeded, then run this
        // handler, and pass on the decoded token.
        function(res) {
          token.store(res.data);
          service.name = token.decode().name
          return token.decode();
        }
        // since there is no error handler, pass
        // an error on to the next promise, without
        // calling the above success handler
        // , function(err) { null; }
      );

      return promise;
    }
    function logOut() {
      token.destroy();
    }
  }

})();
