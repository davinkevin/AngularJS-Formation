angular.module('cf.common.dataService.topicService', [])
  .factory('topicService', topicService);

function topicService($timeout) {
  var self = this;
  self.topics = [
    {
      "id": 1,
      "title": "Title 1",
      "text": "Topic1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      "id": 2,
      "title": "Title 2",
      "text": "Topic2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      "id": 3,
      "title": "Title 3",
      "text": " Topic3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  ];


  return {
    findById : findById,
    findAll : findAll
  };

  function findAll() {
    return $timeout(function() {
      return _.cloneDeep(self.topics);
    }, 1000);
  }

  function findById(id) {
    return $timeout(function() {
      return _.cloneDeep(_.findWhere(self.topics, function(e) { return e.id === parseInt(id);}) );
    }, 1000);
  }
}
