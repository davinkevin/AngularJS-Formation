angular.module('cf.common.dataService.commentService', [])
  .factory('commentService', commentService);

function commentService($timeout) {
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
        save : save,
        remove : remove,
        findByTopic : findByTopic
    };

    function findByTopic(topicId) {
      return  $timeout(function() {
        return self.comments.filter(function(c) { return c.topicId === parseInt(topicId); });
      }, 1000);
    }

    function save(topicId, comment) {
      return $timeout(function() {
          var copyOfComment = angular.copy(comment);
          copyOfComment.topicId = topicId;
          self.comments.push(copyOfComment);
          return copyOfComment;
        }, 1000);
    }

    function remove(comment) {
      return $timeout(function() {
        self.comments = self
            .comments
            .filter(function(c) { return c.id !== parseInt(comment.id);});
      }, 1000);
    }
}
