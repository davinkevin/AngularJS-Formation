angular.module('cf.config.routes', [
    'ngRoute'
])
.config(function routeConfig($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
});
