(function (){
  angular
    .module("student-portal")
    .component("users", {
      template:     "<ng-outlet></ng-outlet>",
      $routeConfig: [
        {path: "/me",  name: "UsersShow",   component: "usersShow",  useAsDefault: true},
        {path: "/messages/:id", name: "MessagesShow", component: "messagesShow"}
      ]
    })
    .component("usersShow", {
      templateUrl:  "js/usersComponent/usersShow.html",
      controller:   UsersShowController
    })
    .component("messagesShow", {
      templateUrl:  "js/usersComponent/messages.html",
      controller:   MessagesController
    })
    .directive('fullscreen', function () {
      function setHeightTo100(scope, element, attrs) {
        element.height($(window).height() - $('.nav-wrapper').outerHeight())
        $("#chat-box")
          .height($(window).height() - $('.nav-wrapper').outerHeight() - $("#input-box").outerHeight() - $("#listing-info").outerHeight() - 20)
          .scrollTop($("#chat-box").height())
      }

      $(window).resize(function () {
        $("#messages").height($(window).height() - $('.nav-wrapper').outerHeight())
        $("#chat-box").height($(window).height() - $('.nav-wrapper').outerHeight() - $("#input-box").outerHeight() - $("#listing-info").outerHeight() - 20)
      })

      return setHeightTo100
    })

    UsersShowController.$inject = ["$http"]
    MessagesController.$inject  = ["$http", authService]

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

    function MessagesController($http, authService) {
      var vm = this
      vm.authService    = authService

      vm.chat = {}
      vm.chatUsers = {}

      vm.test = "hello!"
      vm.$routerOnActivate = function (next) {
        $http
          .get('/api/chats/' + next.params.id)
          .then(function (res) {
            vm.chat = res.data

            // var host = vm.chat.host

            // if (vm.authService.getMyId() == )

            vm.chatUsers[vm.chat.host._id] = vm.chat.host
            vm.chatUsers[vm.chat.user._id] = vm.chat.user

            console.log(vm.chat)
          })
      }
    }


})()
