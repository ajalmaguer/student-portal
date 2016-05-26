(function (){
  angular
    .module("student-portal")
    .component("users", {
      template:     "<ng-outlet></ng-outlet>",
      $routeConfig: [
        {path: "/me",  name: "UsersShow",   component: "usersShow",  useAsDefault: true}
      ]
    })
    .component("usersShow", {
      templateUrl:  "js/usersComponent/usersShow.html",
      controller:   UsersShowController,
    })

    UsersShowController.$inject = ["$http"]

    function UsersShowController ($http) {
      var vm = this

      $http
        .get('/api/users/me')
        .then(function(res){
          console.log(res.data.message)
          console.log(res.data.data)
        }, function(err) {
              console.log(err);
        });

    }


})()
