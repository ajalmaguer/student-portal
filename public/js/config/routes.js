(function() {
  angular.module("student-portal")
    .config(MainRouter)

  MainRouter.$inject = ["$stateProvider", "$urlRouterProvider"]

  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html'
      })
      .state('listingsList', {
        url: '/listings/list',
        templateUrl: 'js/listings/listings-list.html',
        controller: 'ListingsListController',
        controllerAs: 'listingListVm'
      })

    $urlRouterProvider.otherwise('/');
  }

})()
