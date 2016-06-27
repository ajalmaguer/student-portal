(function() {
  angular
    .module("student-portal", ["ngResource", "ngComponentRouter", "wapweb.componentRouterActive", "ui.materialize", "luegg.directives"])
    .value("$routerRootComponent", "app")
    .component("app",{
      template: "<navbar></navbar>" +
                "<ng-outlet></ng-outlet>",
      $routeConfig: [
        //path = url,           name= URL shortcut, component = template
        {path: "/",             name: "Home",       component: "home", useAsDefault: true},
        {path: "/listings/...", name: "Listings",   component: "listings"},
        {path: "/newListing",   name: "NewListing", component: "newListing"},
        {path: "/signin",       name: "Signin",     component: "signin"},
        {path: "/users/...",    name: "Users",      component: "users"},
        {path: "/messages/...", name: "Messages",   component: "messages"}
      ]
    })
    .component("navbar", {
      templateUrl: "js/home/navbar.html",
      controller: NavbarController
    })
    .component("signin", {
      templateUrl: "js/auth/signin.html",
      controller:  SignInController,
      bindings: { $router: "<" }
    })

    NavbarController.$inject = ["$log", "authService", "$rootRouter", "$timeout"];
    SignInController.$inject = ["$log", "authService", "userService"];


    function NavbarController($log, authService, $rootRouter, $timeout) {
      var vm = this

      vm.authService  = authService
      vm.setUpName    = setUpName
      vm.logOut       = logOut

      function setUpName() {
        $(".dropdown-button").dropdown()
        return vm.authService.getName()
      }

      $timeout(function (){
        $(".button-collapse").sideNav()
      })

      function logOut() {
        console.log("hello")
        vm.authService.logOut()
        Materialize.toast("Goodbye!", 4000)
        $rootRouter.navigate(['Home'])
      }
    }


    function SignInController($log, authService, userService) {
      var vm = this;

      // BINDINGS
      vm.signUp = {};
      vm.submitSignUp = submitSignUp;
      vm.validEmailDomains = ["usc.edu"];
      vm.invalidDomain = false;
      vm.passwordsDontMatch = false;
      vm.logIn = {};
      vm.submitLogIn = submitLogIn;
      vm.conflict = false;

      // FUNCTIONS
      function submitSignUp() {
        var emailDomain = vm.signUp.email.split("@")[1]
        if (vm.validEmailDomains.indexOf(emailDomain) == -1) {
          vm.invalidDomain = true
        } else if (vm.signUp.password != vm.signUp.passwordConfirmation){
          vm.passwordsDontMatch = true
        } else {
          userService
            .create(vm.signUp)
            .then(function(res) {
              return authService.logIn(vm.signUp);
            })
            .then(
              // on success
              function(decodedToken) {
                $log.info('Logged in!', decodedToken);
                Materialize.toast("Welcome " +  decodedToken.name, 3000)
                vm.$router.navigate(['Home'])
              },
              // on error
              function(err) {
                if (err.status === 409) vm.conflict = true;
                $log.info('Error Claire-r:', err);
              }
            );
        }
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
