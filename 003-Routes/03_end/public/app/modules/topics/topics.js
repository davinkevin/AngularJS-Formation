angular.module('cf.topics', [
  'cf.common.dataService.topicService',
  'ngRoute'
])
  .config(topicsRouteConfig)
  .controller('topicsController', topicsController);

function topicsController(topics) {
  var vm = this;

  vm.topics = topics;

}

function topicsRouteConfig($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'topics/topics.html',
      controller: 'topicsController',
      controllerAs: 'tc',
      resolve : {
        topics : function topics(topicService) {
          return topicService.findAll();
        }
      }
    });
}