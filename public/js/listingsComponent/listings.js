(function () {
  angular
    .module("student-portal")
    .factory("ListingResource", ListingResource)
    .component("listings", {
      template:     "<h5>Listings</h5> \n" +
                    "<ng-outlet></ng-outlet>",
      $routeConfig: [
        {path: "/",     name: "ListingsList",   component: "listingsList", useAsDefault: true},
        {path: "/:id",  name: "ListingsShow",   component: "listingsShow"}
      ]
    })
    .component("listingsList", {
      templateUrl:  "js/listingsComponent/listingsList.html",
      controller:   ListingsListController
    })
    .component("listingsShow", {
      templateUrl:  "js/listingsComponent/listingsShow.html",
      controller:   ListingsShowController
    })
    // .component("card", {
    //   template: ""
    // })

  ListingResource.$inject = ["$resource"]
  ListingsListController.$inject = ["ListingResource"]
  ListingsShowController.$inject = ["ListingResource"]

  function ListingResource($resource) {
    return $resource(
        "/api/listings/:id",
        {id: "@id"},
        {
          "update": {method: "PUT"}
        }
      )
  }

  function ListingsListController(ListingResource) {
    var vm = this

    vm.listings = []

    vm.$routerOnActivate = function () {
      ListingResource.query().$promise.then(function (listings){
        vm.listings = listings
      })
    }
  }

  function ListingsShowController(ListingResource) {
    var vm = this

    vm.listing = {}

    vm.$routerOnActivate = function (next) {
      $('.parallax').parallax();

      ListingResource
        .get({id: next.params.id})
        .$promise.then(function(jsonListing) {
          vm.listing = jsonListing
        })
    }

  }



})()
