(function() {
  angular
    .module("student-portal", ["ngResource", "ngComponentRouter"])
    .value('$routerRootComponent', 'app')
    .component('app',{
      templateUrl: 'js/appTemplate.html',
      $routeConfig: [
        //path = url,           name= URL shortcut, component = template
        {path: '/',             name: 'Home',       component: 'home', useAsDefault: true},
        {path: '/listings/...', name: 'Listings',   component: 'listings'}
      ]
    })
    .component('navbar', {
      templateUrl: 'js/home/navbar.html',
      controller: NavbarController
    })

    NavbarController.$inject = ["$log", "authService"];

    function NavbarController($log, authService) {
      var vm = this;

      vm.authService = authService;

      $log.info("NavbarController loaded!");
    }
})()
