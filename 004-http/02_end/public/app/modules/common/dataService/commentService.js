angular.module('cf.common.dataService.commentService', [])
    .factory('commentService', commentService);

function commentService($http) {
    return {
        save: save,
        remove: remove,
        findByTopic: findByTopic
    };

    function save(topicId, comment) {
        comment.topicId = topicId;
        return $http.post('/api/comments', comment).then(extractor);
    }

    function findByTopic(topicId) {
        return $http.get('/api/topics/' + topicId + '/comments').then(extractor);
    }

    function remove(comment) {
        return $http.delete('/api/comments/' + comment.id);
    }

    function extractor(r) {
        return r.data;
    }
}
