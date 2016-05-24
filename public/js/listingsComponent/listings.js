(function () {
  angular
    .module("student-portal")
    .component("listings", {
      templateUrl: "js/listingsComponent/listings.html",
      controller: ListingsController
    })


  function ListingsController() {
    var vm = this

    vm.test = "hello world!"
  }



})()
