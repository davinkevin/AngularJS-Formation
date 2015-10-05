angular.module('cf.common.dataService.commentService', [
    'restangular'
])
    .factory('commentService', commentService);

function commentService($timeout, $q, Restangular) {
    var self = this;
    self.comments = [
        {
            "id": 2,
            "login": "user1",
            "comment": "Commentaire n° 2",
            "date": 1440875402960,
            "note": 6,
            "topicId": 1
        },
        {
            "id": 3,
            "login": "user1",
            "comment": "Commentaire n° 3",
            "date": 1440875402960,
            "note": 6,
            "topicId": 1
        },
        {
            "note": 9,
            "login": "feafe",
            "text": "afeeaf",
            "date": 1440876963733,
            "topicId": 1,
            "id": 4
        },
        {
            "note": 6,
            "login": "fffff",
            "text": "aa",
            "date": 1440877036049,
            "topicId": 2,
            "id": 5
        },
        {
            "note": 8,
            "login": "fafaeea",
            "text": "efa",
            "date": 1440877059210,
            "topicId": 2,
            "id": 6
        }
    ];

    return {
        save: save,
        remove: remove,
        findByTopic: findByTopic
    };

    function findByTopic(topicId) {
        return $timeout(function () {
            return _.filter(self.comments, function (e) {
                return e.topicId === parseInt(topicId);
            });
        }, 1000);
    }

    function save(comment) {
        return $timeout(function () {
            return self.comments.push(angular.copy(comment));
        }, 1000);
    }

    function remove(comment) {
        return $timeout(function () {
            _.remove(self.comments, function (e) {
                return e.id === parseInt(comment.id);
            });
            return resolve();
        }, 1000);
    }
}
