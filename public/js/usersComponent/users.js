(function (){
  angular
    .module("student-portal")
    .component("users", {
      template:     "<ng-outlet></ng-outlet>",
      $routeConfig: [
        {path: "/me",  name: "UsersShow",   component: "usersShow",  useAsDefault: true},
        {path: "/messages", name: "Messages", component: "messages"}
      ]
    })
    .component("usersShow", {
      templateUrl:  "js/usersComponent/usersShow.html",
      controller:   UsersShowController
    })
    .component("messages", {
      templateUrl:  "js/usersComponent/messages.html",
      controller:   MessagesController
    })
    .directive('fullscreen', function () {
      function setHeightTo100(scope, element, attrs) {
        element.height($(window).height() - $('.nav-wrapper').outerHeight())
        $("#chat-box")
          .height($(window).height() - $('.nav-wrapper').outerHeight() - $("#input-box").outerHeight())
          .scrollTop($("#chat-box").height())
      }

      $(window).resize(function () {
        $("#messages").height($(window).height() - $('.nav-wrapper').outerHeight())
        $("#chat-box").height($(window).height() - $('.nav-wrapper').outerHeight() - $("#input-box").outerHeight())

      })

      return setHeightTo100
    })

    UsersShowController.$inject = ["$http"]
    MessagesController.$inject  = ["$http"]

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

    function MessagesController($http) {
      var vm = this

      vm.test = "hello!"
    }


})()
