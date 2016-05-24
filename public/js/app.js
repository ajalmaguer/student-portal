(function() {
  angular
    .module("student-portal", ["ngResource", "ngComponentRouter"])
    .value('$routerRootComponent', 'app')
    .component('app',{
      templateUrl: 'js/appTemplate.html',
      //path = url          name= URL shortcut  component = template
      $routeConfig: [
        {path: '/',         name: 'Home',       component: 'home', useAsDefault: true},
        {path: '/listings/...', name: 'Listings',   component: 'listings'}
      ]
    })
})()
