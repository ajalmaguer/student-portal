(function () {
  angular
    .module("student-portal")
    .factory("ListingResource", ListingResource)
    .component("listings", {
      template:     "<ng-outlet></ng-outlet>",
      $routeConfig: [
        {path: "/",          name: "ListingsList",  component: "listingsList", useAsDefault: true},
        {path: "/:id",       name: "ListingsShow",  component: "listingsShow"},
        {path: "/:id/edit",  name: "ListingsEdit",  component: "listingsEdit"}
      ]
    })
    .component("listingsList", {
      templateUrl:  "js/listingsComponent/listingsList.html",
      controller:   ListingsListController
    })
    .component("listingsShow", {
      templateUrl:  "js/listingsComponent/listingsShow.html",
      controller:   ListingsShowController,
      bindings: { $router: '<' }
    })
    .component("newListing", {
      templateUrl:  "js/listingsComponent/newListing.html",
      controller:   NewListingController,
      bindings: { $router: '<' }
    })
    .component("listingsEdit", {
      templateUrl:  "js/listingsComponent/editListing.html",
      controller:   EditListingController
    })
    .component("listingCard", {
      templateUrl:  "js/listingsComponent/listingCard.html",
      controller:   ListingCardController,
      bindings:     {listing: "<"}
    })

  ListingResource.$inject         = ["$resource"]
  ListingsListController.$inject  = ["ListingResource", "$timeout", "$scope"]
  ListingsShowController.$inject  = ["ListingResource", "authService"]
  NewListingController.$inject    = ["ListingResource", "$timeout"]
  EditListingController.$inject   = ["ListingResource", "$timeout"]
  ListingCardController.$inject   = ["$http", "authService"]

  function ListingResource($resource) {
    return $resource(
        "/api/listings/:id",
        {id: "@id"},
        {
          "update": {method: "PUT"}
        }
      )
  }

  function ListingsListController(ListingResource, $timeout, $scope) {
    var vm = this

    vm.listings = []
    vm.roomTypes = ["Private Room", "Shared Room", "Entire Place"]

    vm.priceRange = priceRange

    function priceRange(listing, index, array) {
      return listing.rent > vm.minPrice && listing.rent < vm.maxPrice
    }


    vm.$routerOnActivate = function () {
      ListingResource.query().$promise.then(function (listings){
        vm.listings = listings
      })
    }

    $timeout(function () {
      $('select').material_select()

      var slider = document.getElementById('priceRange')
      noUiSlider.create(slider, {
       start: [0, 3000],
       connect: true,
       step: 50,
       range: {
         'min': 10,
         'max': 3000
       }
      })

      slider.noUiSlider.on('update', function ( values, handle ) {
        if ( handle == 0 ) {
          vm.minPrice = values[handle]
        }
        if ( handle == 1 ) {
          vm.maxPrice = values[handle]
        }
          $scope.$apply()
      })
    })
  }

  function ListingsShowController(ListingResource, authService) {
    var vm = this
    vm.authService  = authService
    vm.deleteListing = deleteListing

    vm.listing = {}

    vm.$routerOnActivate = function (next) {
      $('.parallax').parallax();

      ListingResource
        .get({id: next.params.id})
        .$promise.then(function(jsonListing) {
          vm.listing = jsonListing
        })
    }

    function deleteListing(id) {
      if (window.confirm("blah")){
        ListingResource
          .delete({id: id})
          .$promise.then(function(res){
            Materialize.toast(res.message,4000)
            vm.$router.navigateByUrl('/listings')
          })
      }
    }
  }

  function NewListingController(ListingResource, $timeout) {
    var vm = this

    vm.states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"]
    vm.roomTypes = ["Private Room", "Shared Room", "Entire Place"]
    vm.propertyTypes = ["Home", "Apartment", "Loft", "Studio", "Dorm", "Other"]
    vm.newListing = {
      space:{
        accomodates: 1,
        bedrooms: 1,
        bathrooms: 1
      },
      amenities: [
        {description: "Kitchen",       value:    false},
        {description: "Washer in unit",        value:    false},
        {description: "Washer on property",        value:    false},
        {description: "Wifi Included", value:    false},
        {description: "Utilities Included",value: false},
        {description: "Furnished",     value:    false},
        {description: "AC",            value:    false},
        {description: "Heating",       value:    false},
        {description: "Gym",           value:    false},
        {description: "Large Closet",  value:    false},
        {description: "TV Included",   value:    false},
        {description: "Free Parking",  value:    false},
        {description: "Pool",          value:    false}
      ],
      rules: [
        {description: "Smoking",       value:    false},
        {description: "Pets",          value:    false}
      ]
    }

    vm.getA = getA
    vm.addListing = addListing

    function getA(string){
      var vowels = ["A", "E", "I", "O", "U", "a", "e", "i", "o", "u"]
      if (vowels.indexOf(string[0]) === -1) {
        return "a " + string
      } else {
        return "an " + string
      }
    }

    function addListing() {
      console.log(vm.newListing)
      ListingResource
        .save(vm.newListing)
        .$promise.then(function (jsonListing){
          console.log(jsonListing)
          vm.$router.navigateByUrl('/listings/'+jsonListing._id)
        })
    }

    //initilize materialize elements
    $timeout(function () {
      $('select').material_select()
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
        onClose: function() {
            $('.datepicker').blur();
        }
      })
    })
  }

  function EditListingController(ListingResource, $timeout) {
    var vm = this

    vm.states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"]
    vm.roomTypes = ["Private Room", "Shared Room", "Entire Place"]
    vm.propertyTypes = ["Home", "Apartment", "Loft", "Studio", "Dorm", "Other"]
    vm.listing = {
      space:{
        accomodates: 1,
        bedrooms: 1,
        bathrooms: 1
      },
      amenities: [
        {description: "Kitchen",       value:    false},
        {description: "Washer in unit",        value:    false},
        {description: "Washer on property",        value:    false},
        {description: "Wifi Included", value:    false},
        {description: "Utilities Included",value: false},
        {description: "Furnished",     value:    false},
        {description: "AC",            value:    false},
        {description: "Heating",       value:    false},
        {description: "Gym",           value:    false},
        {description: "Large Closet",  value:    false},
        {description: "TV Included",   value:    false},
        {description: "Free Parking",  value:    false},
        {description: "Pool",          value:    false}
      ],
      rules: [
        {description: "Smoking",       value:    false},
        {description: "Pets",          value:    false}
      ]
    }

    vm.$routerOnActivate = function (next) {

      ListingResource
        .get({id: next.params.id})
        .$promise.then(function(jsonListing) {
          vm.listing = jsonListing
        })
    }

    vm.getA = getA
    vm.editListing = editListing

    function getA(string){
      var vowels = ["A", "E", "I", "O", "U", "a", "e", "i", "o", "u"]
      if (vowels.indexOf(string[0]) === -1) {
        return "a " + string
      } else {
        return "an " + string
      }
    }

    function editListing() {
      ListingResource.update({id: vm.listing._id}, vm.listing).$promise.then(function(updatedListing) {
        vm.listing = updatedListing;
        Materialize.toast("Saved!", 4000)
      });
    }

    $timeout(function () {
      $('select').material_select()
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
        onClose: function() {
            $('.datepicker').blur();
        }
      })
    })
  }

  function ListingCardController($http, authService) {
    var vm = this

    vm.authService = authService
    vm.likeListing = likeListing
    vm.amILiked    = amILiked

    function likeListing(listingId) {
      if (amILiked()) {
        dislike(listingId)
      } else {
        $http
          .put("/api/listings/"+ listingId +"/like", {listingId: listingId})
          .then(function (res){
            vm.listing = res.data
          }, function (err) {
            console.log(err)
          })
      }
    }

    function dislike(listingId){
      $http
          .put("/api/listings/"+ listingId +"/dislike", {listingId: listingId})
          .then(function (res){
            vm.listing = res.data
          }, function (err) {
            console.log(err)
          })
    }

    function amILiked() {
      if (vm.listing.favUsers){
        return vm.listing.favUsers.indexOf(vm.authService.getMyId()) !== -1
      } else {
        return false
      }
    }
  }

})()
