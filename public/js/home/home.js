(function () {
  angular
    .module("student-portal")
    .component("home", {
      templateUrl: "js/home/home.html",
      controller: HomeController
    })
    .component("about", {
      templateUrl: "js/home/about.html",
      controller: AboutController
    })

  function HomeController() {
    var vm = this
    vm.$routerOnActivate = function (next) {
      $('#index-banner').height(window.innerHeight)
      $('.parallax').parallax();
    }
  }

  function AboutController() {
    var vm = this
  }
})()
