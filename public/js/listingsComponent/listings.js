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
  ListingsShowController.$inject  = ["ListingResource", "authService", "$timeout", "$http", "$rootRouter"]
  NewListingController.$inject    = ["ListingResource", "$timeout", "$scope"]
  EditListingController.$inject   = ["ListingResource", "$timeout", "$scope"]
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

  function ListingsShowController(ListingResource, authService, $timeout, $http, $rootRouter) {
    var vm = this
    vm.authService    = authService
    vm.deleteListing  = deleteListing
    vm.sendMessage    = sendMessage

    vm.listing = {}
    vm.message = ""

    vm.$routerOnActivate = function (next) {
      ListingResource
        .get({id: next.params.id})
        .$promise.then(function(jsonListing) {
          vm.listing = jsonListing
        })
    }

    // Initialize Materialize plugins
    $timeout(function () {
      $('.parallax').parallax()
      $('.modal-trigger').leanModal()
    })

    function deleteListing(id) {
      if (window.confirm("Are you sure you want to delete this?")){
        ListingResource
          .delete({id: id})
          .$promise.then(function(res){
            Materialize.toast(res.message,4000)
            vm.$router.navigateByUrl('/listings')
          })
      }
    }

    function sendMessage() {
      var myId = vm.authService.getMyId()
      console.log("sending message: ", vm.message)
      var newChat = {
        listingId:  vm.listing._id,
        user:       myId,
        host:       vm.listing.hostId._id,
        messages:   [{
          userId: myId,
          text:   vm.message,
          created_at: new Date,
          updated_at: new Date
        }]
      }

      $http
        .post("/api/chats", newChat)
        .then(function (res){
          console.log("new chat object = ", res.data)
          $('#msgModal').closeModal()
          $rootRouter.navigate(["Messages" , "MessagesShow", {id: res.data._id}])
        }, function (err){
          console.log(err)
        })

    }
  }

  function NewListingController(ListingResource, $timeout, $scope) {
    var vm = this

    vm.upload = upload

    function upload() {
      var file = document.querySelector('.imageFile').files[0]
      if (!file || !file.type.match(/image.*/)) return;

      console.log("file =", file)

      /* Lets build a FormData object*/
      var fd = new FormData(); // I wrote about it: https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
      fd.append("image", file); // Append the file
      var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
      xhr.open("POST", "https://api.imgur.com/3/image.json"); // Boooom!
      xhr.onload = function() {
          // Big win!
          vm.newListing.imageUrl = JSON.parse(xhr.responseText).data.link;
          console.log(vm.newListing.imageUrl)
          console.log("uploaded")
          $scope.$apply()
      }

      xhr.setRequestHeader('Authorization', 'Client-ID e6b932fe7852a7d'); // Get your own key http://api.imgur.com/

      // Ok, I don't handle the errors. An exercise for the reader.
      /* And now, we send the formdata */
      xhr.send(fd);

    }


    vm.getA = getA
    vm.addListing = addListing

    vm.states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"]
    vm.roomTypes = ["Private Room", "Shared Room", "Entire Place"]
    vm.propertyTypes = ["Home", "Apartment", "Loft", "Studio", "Dorm", "Other"]

    vm.newListing = {
      space:{
        accomodates: 1,
        bedrooms: 1,
        bathrooms: 1
      },
      address: {},
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

    function getA(string){
      var vowels = ["A", "E", "I", "O", "U", "a", "e", "i", "o", "u"]
      if (vowels.indexOf(string[0]) === -1) {
        return "a " + string
      } else {
        return "an " + string
      }
    }

    function addListing() {
      if (!vm.newListing.roomType) return Materialize.toast("Please select a room type.", 2000)
      if (!vm.newListing.imageUrl) return Materialize.toast("Please upload an image.", 2000)
      if (!vm.newListing.moveInDate) return Materialize.toast("Please enter a move in date.", 2000)
      if (!vm.newListing.rent) return Materialize.toast("Please enter a rent amount.", 2000)

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

    // Initialize google places address autocomplete
    vm.$routerOnActivate = function () {
      initAutocomplete()
      document.getElementById('autocomplete').onfocus = function () {
        geolocate()
      }
    }

    function initAutocomplete() {
      // Create autocomplete object, restricting search to geographical location types.
      autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),
        {types: ['geocode']}
      )

      // When the user selects an address from the dropdown, populate the address fields in the form.
      autocomplete.addListener('place_changed', fillInAddress)
    }

    function fillInAddress() {
      // Get the place details from the autocomplete object.
      var addressComponents = autocomplete.getPlace().address_components

      // addressComponent is an array of objects. this is the legend:
      // 0 = street #
      // 1 = street address
      // 2 = neighborhood
      // 3 = city
      // 4 = county
      // 5 = state
      // 6 = country
      // 7 = zip

      var address = addressComponents[0].short_name + " " + addressComponents[1].short_name
      var city    = addressComponents[3].short_name
      var zip     = addressComponents[7].short_name

      var state
      if (addressComponents[4].types[0] == "administrative_area_level_1") {
        state = addressComponents[4].short_name
      } else {
        state = addressComponents[5].short_name
      }


      // Get each component of the address from the place details and fill the corresponding field on the form.
      vm.newListing.address.address  = address
      vm.newListing.address.city     = city
      vm.newListing.address.zip      = Number(zip)
      vm.newListing.address.state    = state

      // Update anuglar scope
      $scope.$apply()

      Materialize.updateTextFields()
      $('select').material_select()

    }

    function geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          autocomplete.setBounds(circle.getBounds());
        });
      }
    }

  }

  function EditListingController(ListingResource, $timeout, $scope) {
    var vm = this
    vm.getA = getA
    vm.editListing = editListing

    vm.upload = upload

    function upload() {
      var file = document.querySelector('.imageFile').files[0]
      if (!file || !file.type.match(/image.*/)) return;

      console.log("file =", file)

      /* Lets build a FormData object*/
      var fd = new FormData(); // I wrote about it: https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
      fd.append("image", file); // Append the file
      var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
      xhr.open("POST", "https://api.imgur.com/3/image.json"); // Boooom!
      xhr.onload = function() {
          // Big win!
          vm.listing.imageUrl = JSON.parse(xhr.responseText).data.link;
          console.log(vm.listing.imageUrl)
          console.log("uploaded")
          $scope.$apply()
      }

      xhr.setRequestHeader('Authorization', 'Client-ID e6b932fe7852a7d'); // Get your own key http://api.imgur.com/

      // Ok, I don't handle the errors. An exercise for the reader.
      /* And now, we send the formdata */
      xhr.send(fd);

    }

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

    function getA(string){
      var vowels = ["A", "E", "I", "O", "U", "a", "e", "i", "o", "u"]
      if (vowels.indexOf(string[0]) === -1) {
        return "a " + string
      } else {
        return "an " + string
      }
    }

    function editListing() {
      console.log(vm.listing.moveInDate)

      ListingResource.update({id: vm.listing._id}, vm.listing).$promise.then(function(updatedListing) {
        vm.listing = updatedListing;
        Materialize.toast("Saved!", 4000)
      })
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
          .put( "/api/listings/"+ listingId +"/like",
                {listingId: listingId})
          .then(function (res){
            vm.listing = res.data
          }, function (err) {
            console.log(err)
          })
      }
    }

    function dislike(listingId){
      $http
          .put(
            "/api/listings/"+ listingId +"/dislike",
            {listingId: listingId})
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

function upload(file){
  console.log(file)
}
