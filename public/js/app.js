(function() {
  angular
    .module("student-portal", ["ngResource", "ngComponentRouter", "wapweb.componentRouterActive", "ui.materialize"])
    .value("$routerRootComponent", "app")
    .component("app",{
      templateUrl: "js/appTemplate.html",
      $routeConfig: [
        //path = url,           name= URL shortcut, component = template
        {path: "/",             name: "Home",       component: "home", useAsDefault: true},
        {path: "/listings/...", name: "Listings",   component: "listings"},
        {path: "/newListing",   name: "NewListing", component: "newListing"},
        {path: "/signin",       name: "Signin",     component: "signin"},
        {path: "/users/...",    name: "Users",      component: "users"}
      ]
    })
    .component("navbar", {
      templateUrl: "js/home/navbar.html",
      controller: NavbarController
    })
    .component("signin", {
      templateUrl: "js/auth/signin.html",
      controller:  SignInController,
      bindings: { $router: '<' }
    })

    NavbarController.$inject = ["$log", "authService"];
    SignInController.$inject = ["$log", "authService", "userService"];


    function NavbarController($log, authService) {
      var vm = this

      vm.authService  = authService
      vm.setUpName    = setUpName

      function setUpName() {
        $(".dropdown-button").dropdown();
        return vm.authService.getName()
      }

    }


    function SignInController($log, authService, userService) {
      var vm = this;

      // BINDINGS
      vm.signUp = {};
      vm.submitSignUp = submitSignUp;
      vm.logIn = {};
      vm.submitLogIn = submitLogIn;
      vm.conflict = false;

      // FUNCTIONS
      function submitSignUp() {
        userService
          .create(vm.signUp)
          .then(function(res) {
            return authService.logIn(vm.signUp);
          })
          .then(
            // on success
            function(decodedToken) {
              $log.info('Logged in!', decodedToken);
              vm.$router.navigate(['Home'])
            },
            // on error
            function(err) {
              if (err.status === 409) vm.conflict = true;
              $log.info('Error Claire-r:', err);
            }
          );
      }

      function submitLogIn() {
        authService
          .logIn(vm.logIn)
          .then(
            // on success
            function(decodedToken) {
              $log.info('Logged in!', decodedToken);
              vm.$router.navigate(['Home'])
            },
            // on error
            function(err) {
              Materialize.toast(err.data, 4000)
              $log.info('Error:', err);
            }
          );
      }

      $log.info("SignInController loaded!");
    }
})()
