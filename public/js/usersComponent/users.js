(function (){
  angular
    .module("student-portal")
    .component("users", {
      template:     "<ng-outlet></ng-outlet>",
      $routeConfig: [
        {path: "/:id",  name: "UsersShow",   component: "usersShow",  useAsDefault: true},
      ]
    })
    .component("usersShow", {
      templateUrl:  "js/usersComponent/usersShow.html",
      controller:   UsersShowController,
    })

    function UsersShowController () {
      var vm = this

    }


})()
