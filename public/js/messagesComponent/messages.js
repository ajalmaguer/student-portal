(function (){
  angular
    .module("student-portal")
    .component("messages", {
      template:     "<ng-outlet></ng-outlet>",
      $routeConfig: [
        {path: "/:id", name: "MessagesShow", component: "messagesShow"}
      ]
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

    MessagesController.$inject  = ["$http", "authService"]

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

            var host = vm.chat.host
            var user = vm.chat.user

            if (vm.authService.getMyId() === host._id){
              host.isMe = true
              user.isMe = false
            } else {
              host.isMe = false
              user.isMe = true
            }

            vm.chatUsers[host._id] = host
            vm.chatUsers[user._id] = user

            console.log(vm.chat)
            console.log("vm.chatUsers = ", vm.chatUsers)
          })
      }
    }

})()
