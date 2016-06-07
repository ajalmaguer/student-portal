(function (){
  angular
    .module("student-portal")
    .component("messages", {
      template:     "<ng-outlet></ng-outlet>",
      $routeConfig: [
        {path: "/",     name: "MessagesList", component: "messagesList"},
        {path: "/:id",  name: "MessagesShow", component: "messagesShow"}
      ]
    })
    .component("messagesList", {
      templateUrl:  "js/messagesComponent/messagesList.html",
      controller:   MessagesListController
    })
    .component("messagesShow", {
      templateUrl:  "js/messagesComponent/messagesShow.html",
      controller:   MessagesShowController
    })
    .factory('socket', function ($rootScope) {
      var socket = io.connect();
      return {
        on: function (eventName, callback) {
          socket.on(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              callback.apply(socket, args);
            });
          });
        },
        emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              if (callback) {
                callback.apply(socket, args);
              }
            });
          })
        }
      };
    })
    .directive('fullscreen', function () {
      function setHeightTo100(scope, element, attrs) {
        element.height($(window).height() - $('.nav-wrapper').outerHeight())
        $("#chat-box")
          .height($(window).height() - $('.nav-wrapper').outerHeight() - $("#input-box").outerHeight() - $("#listing-info").outerHeight() - 20)
      }

      $(window).resize(function () {
        $("#messages").height($(window).height() - $('.nav-wrapper').outerHeight())
        $("#chat-box").height($(window).height() - $('.nav-wrapper').outerHeight() - $("#input-box").outerHeight() - $("#listing-info").outerHeight() - 20)
      })

      return setHeightTo100
    })

    MessagesListController.$inject  = ["$http", "authService"]
    MessagesShowController.$inject  = ["$http", "authService", "socket", "$timeout"]

    function MessagesListController($http, authService) {
      var vm = this
      vm.authService = authService
      vm.myChats = []

      $http
          .get('/api/users/me/messages')
          .then(function(res){
            vm.myChats = res.data.chats

            // populate otherUsers object,
            // which will help display other users images and names
            vm.myChats.forEach(chat => {
              var host = chat.host
              var user = chat.user

              if (vm.authService.getMyId() === host._id){
                chat.otherUser = user
              } else {
                chat.otherUser = host
              }
            })
          }, function(err) {
            console.log(err);
          })
    }

    function MessagesShowController($http, authService, socket, $timeout) {
      var vm = this
      vm.authService  = authService
      vm.sendMsg      = sendMsg

      vm.chat = {}
      vm.chatUsers = {}
      vm.message = ""

      vm.test = "hello!"
      vm.$routerOnActivate = function (next) {
        socket.emit("join", {msgId: next.params.id});

        socket.on("loadChat", function (chat) {
          vm.chat = chat
          console.log(chat)

          // populate otherUsers object.
          // Will help in figureing out
          // which message goes with which user.
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
        })

        socket.on("error", function (data) {
          console.log(data)
        })


        socket.on("newMsg", function (message){
          vm.chat.messages.push(message)
        })
      }

      function sendMsg() {
        // send message only if there is text to send
        if (vm.message.length >0) {
          var message = {
            userId: vm.authService.getMyId(),
            text:   vm.message,
            created_at: new Date,
            updated_at: new Date
          }
          socket.emit("newMsg", message)
          vm.message = ""
          $timeout(function () {
            $("textarea").trigger('autoresize');
          })
        }
      }

    }

})()
