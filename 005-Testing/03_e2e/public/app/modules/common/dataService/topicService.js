angular.module('cf.common.dataService.topicService', [])
    .factory('topicService', topicService);

function topicService(Restangular) {
    return {
        findById: findById,
        findAll: findAll
    };

    function findAll() {
        return Restangular.all('topics').getList();
    }

    function findById(id) {
        return Restangular.one('topics', id).get();
    }
}
