angular.module('cf.topic', [
        'cf.common.dataService.commentService',
        'cf.common.dataService.topicService',
        'cf.common.components.starRating',
        'cf.common.components.isLoading',
        'ngRoute'
    ])
    .config(topicRouteConfig)
    .controller('topicController', topicController);

function topicController(commentService, topic, comments) {
    var vm = this;
    vm.loading = false;
    vm.listComments = comments;
    resetComment();

    vm.topic = topic;

    vm.addComments = function () {
        vm.newComment.date = Date.now();
        vm.loading = true;

        commentService
            .save(vm.topic.id, vm.newComment)
            .then(attachComments)
            .then(resetComment)
            .finally(stopLoading);
    };
    vm.deleteComment = function (comment) {
        return commentService
            .remove(comment)
            .then(function() { return removeLocally(comment);});
    };

    function removeLocally(comment) {
        vm.listComments.splice(vm.listComments.indexOf(comment), 1);
    }

    function attachComments(commentSaved) {
        vm.listComments.push(commentSaved);
    }

    function stopLoading() {
        vm.loading = false;
    }

    function resetComment() {
        vm.newComment = {note: 5};
        if (vm.formComment)
            vm.formComment.$setUntouched(true);
    }
}

function topicRouteConfig($routeProvider) {
    $routeProvider.
    when('/topics/:id', {
        templateUrl: 'topic/topic.html',
        controller: 'topicController',
        controllerAs: 'tc',
        resolve: {
            topic: function topic(topicService, $route) {
                return topicService.findById($route.current.params.id);
            },
            comments: function commentsOnTopic(commentService, $route) {
                return commentService.findByTopic($route.current.params.id);
            }
        }
    });
}
