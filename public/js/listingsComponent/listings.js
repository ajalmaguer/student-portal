(function () {
  angular
    .module("student-portal")
    .factory("ListingResource", ListingResource)
    .component("listings", {
      templateUrl: "js/listingsComponent/listings.html",
      controller: ListingsController
    })
    // .component("card", {
    //   template: ""
    // })

  ListingResource.$inject = ["$resource"]
  ListingsController.$inject = ["ListingResource"]

  function ListingResource($resource) {
    return $resource(
        "/api/listings/:id",
        {id: "@id"},
        {
          "update": {method: "PUT"}
        }
      )
  }

  function ListingsController(ListingResource) {
    var vm = this

    vm.listings = []

    ListingResource.query().$promise.then(function (listings){
      vm.listings = listings
    })

    // vm.listings = [
    //   {
    //     rent: 1,
    //     imageUrl: "https://a1.muscache.com/im/pictures/4b9291ff-8226-4767-9c9b-90c713b7c385.jpg?aki_policy=x_medium",
    //     title: "Super Central Santa Monica Stay",
    //     roomType: "Private Room",
    //     hostImgUrl: "https://a1.muscache.com/im/pictures/1f06226c-28e8-4883-96d8-6ed851f91b30.jpg?aki_policy=profile_medium"
    //   },
    //   {
    //     rent: 2,
    //     imageUrl: "https://a2.muscache.com/im/pictures/cfd762e7-fcca-4148-a68e-61ab5cd39d9e.jpg?aki_policy=x_medium",
    //     title: "Private room on second floor house",
    //     roomType: "Private Room",
    //     hostImgUrl: "https://a0.muscache.com/im/pictures/e4a37c9a-25cb-4840-9aaa-ce33f6ed9bba.jpg?aki_policy=profile_medium"
    //   },
    //   {
    //     rent: 3,
    //     imageUrl: "https://a2.muscache.com/im/pictures/90ad9834-795a-4107-b5eb-9ddcb50ee9c7.jpg?aki_policy=x_medium",
    //     title: "Value Deal!",
    //     roomType: "Shared Room",
    //     hostImgUrl: "https://a0.muscache.com/im/pictures/e4a37c9a-25cb-4840-9aaa-ce33f6ed9bba.jpg?aki_policy=profile_medium"
    //   },
    //   {
    //     rent: 4,
    //     imageUrl: "https://a2.muscache.com/im/pictures/972952e3-5235-46c8-8417-c8873a70078f.jpg?aki_policy=x_medium",
    //     title: "Convenient location and best chinese restaurants",
    //     roomType: "Shared Room",
    //     hostImgUrl: "https://a0.muscache.com/im/pictures/643a2786-da1d-4553-89d0-546a3bd922c1.jpg?aki_policy=profile_medium"
    //   }]

    // vm.$routerOnActivate = function () {
    //   console.log("this controller was activeated")
    //   blah = vm.listings
    // }
  }



})()
