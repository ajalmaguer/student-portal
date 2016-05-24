(function() {
  angular.module("student-portal")
    .controller("ListingsListController", ListingsListController)

  function ListingsListController() {
    var vm = this

    vm.listings = [
      {
        lookingFor: "roommate",
        rent: 1000,
        deposit: 1000
      },
      {
        lookingFor: "couchmate",
        rent: 300,
        deposit: 300
      }
    ]
  }

})();
