angular.module('cf.common.dataService.commentService', [
    'restangular'
])
    .factory('commentService', commentService);

function commentService($timeout, $q, Restangular) {
    var self = this;

    return {
        save: save,
        remove: remove,
        findByTopic: findByTopic
    };

    function save(topicId, comment) {
        comment.topicId = topicId;
        return Restangular.all('comments').post(comment);
    }

    function findByTopic(topicId) {
        return Restangular.one('topics', topicId).all('comments').getList();
    }

    function remove(comment) {
        return Restangular.one('comments', comment.id)
            .remove()
            .then(function () {
                return comment;
            });
    }
}
