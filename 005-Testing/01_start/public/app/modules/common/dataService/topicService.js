angular.module('cf.common.dataService.topicService', [])
    .factory('topicService', topicService);

function topicService($http) {
    return {
        findById: findById,
        findAll: findAll
    };

    function findAll() {
        return $http.get('/api/topics').then(extractor);
    }

    function findById(id) {
        return $http.get('/api/topics/' + id).then(extractor);
    }

    function extractor(r) {
        return r.data;
    }
}
