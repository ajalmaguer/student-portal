(function() {
  angular
    .module('student-portal', ['ui.router', 'ngResource'])
    .controller('mainCtrl', mainCtrl)

    function mainCtrl() {
      var vm = this

      vm.hero = {name: "Spawn"}
    }

})()
