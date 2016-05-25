(function() {
  angular
    .module("student-portal", ["ngResource", "ngComponentRouter"])
    .value("$routerRootComponent", "app")
    .component("app",{
      templateUrl: "js/appTemplate.html",
      $routeConfig: [
        //path = url,           name= URL shortcut, component = template
        {path: "/",             name: "Home",       component: "home", useAsDefault: true},
        {path: "/listings/...", name: "Listings",   component: "listings"},
        {path: "/signin",       name: "Signin",     component: "signin"},

      ]
    })
    .component("navbar", {
      templateUrl: "js/home/navbar.html",
      controller: NavbarController
    })
    .component("signin", {
      templateUrl: "js/auth/signin.html",
    })

    NavbarController.$inject = ["$log", "authService"];

    function NavbarController($log, authService) {
      var vm = this;

      vm.authService = authService;

      $log.info("NavbarController loaded!");
    }
})()
