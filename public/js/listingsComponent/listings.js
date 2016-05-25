(function () {
  angular
    .module("student-portal")
    .factory("ListingResource", ListingResource)
    .component("listings", {
      template:     "<ng-outlet></ng-outlet>",
      $routeConfig: [
        {path: "/",     name: "ListingsList",   component: "listingsList", useAsDefault: true},
        {path: "/:id",  name: "ListingsShow",   component: "listingsShow"},
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
    .component("newListing", {
      templateUrl:  "js/listingsComponent/newListing.html",
      controller:   NewListingController
    })
    // .component("card", {
    //   template: ""
    // })

  ListingResource.$inject         = ["$resource"]
  ListingsListController.$inject  = ["ListingResource"]
  ListingsShowController.$inject  = ["ListingResource"]
  NewListingController.$inject    = ["ListingResource", "$timeout"]

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

    vm.convertKey = convertKey

    function convertKey(string){
      string = string
                .replace(/([A-Z])/g, ' $1')
                .toLowerCase()

      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    vm.$routerOnActivate = function (next) {
      $('.parallax').parallax();

      ListingResource
        .get({id: next.params.id})
        .$promise.then(function(jsonListing) {
          vm.listing = jsonListing
        })
    }
  }

  function NewListingController(ListingResource, $timeout) {
    var vm = this

    vm.states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"]

    vm.roomTypes = ["Private Room", "Shared Room", "Entire Place"]
    vm.propertyTypes = ["Home", "Apartment", "Loft", "Studio", "Dorm", "Other"]

    vm.getA = getA

    function getA(string){
      var vowels = ["A", "E", "I", "O", "U", "a", "e", "i", "o", "u"]
      if (vowels.indexOf(string[0]) === -1) {
        return "a " + string
      } else {
        return "an " + string
      }
    }

    vm.newListing = {
      space:{
        accomodates: 1,
        bedrooms: 1,
        bathrooms: 1
      },
      amenities: {
        kitchen:            false,
        washer:             false,
        wifiIncluded:       false,
        utilitiesIncluded:  false,
        furnished:          false,
        ac:                 false,
        heating:            false,
        gym:                false,
        largeCloset:        false,
        tv:                 false,
        freeParking:        false,
        kitchen:            false,
        pool:               false
      }
    }

    //initilize materialize elements
    $timeout(function () {
      $('select').material_select();
    })



  }

})()
