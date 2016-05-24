(function() {
  angular
    .module("student-portal", ["ngResource", "ngComponentRouter"])
    .value('$routerRootComponent', 'app')
    .component('app', {
      templateUrl: 'js/appTemplate.html'
    });

})()
