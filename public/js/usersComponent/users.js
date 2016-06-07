(function (){
  angular
    .module("student-portal")
    .component("users", {
      template:     "<ng-outlet></ng-outlet>",
      $routeConfig: [
        {path: "/me",  name: "UsersShow",   component: "usersShow",  useAsDefault: true},
      ]
    })
    .component("usersShow", {
      templateUrl:  "js/usersComponent/usersShow.html",
      controller:   UsersShowController
    })

    UsersShowController.$inject = ["$http"]

    function UsersShowController ($http) {
      var vm = this

      vm.myListings = {}
      vm.favListings = {}

      vm.$routerOnActivate = function () {
        $http
          .get('/api/users/me')
          .then(function(res){
            vm.myListings = res.data.data.listings
          }, function(err) {
            console.log(err);
          })

        $http
          .get('/api/users/me/listings')
          .then(function(res){
            vm.favListings = res.data
          }, function(err) {
            console.log(err);
          })
      }
    }


})()
