(function () {
  angular
    .module("student-portal")
    .component("home", {
      templateUrl: "js/home/home.html",
      controller: HomeController
    })

  function HomeController() {
    var vm = this
    vm.$routerOnActivate = function (next) {
      $('#index-banner').height(window.innerHeight)
      $('.parallax').parallax();
    }
  }
})()
