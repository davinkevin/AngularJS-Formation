class topicController {

    constructor(commentService, topic, comments) {
        this.loading = false;
        this.listComments = comments;
        this.resetComment();
        this.topic = topic;

        this.commentService = commentService;
    }

    addComments() {
        this.newComment.date = Date.now();
        this.loading = true;

        this.commentService
            .save(this.topic.id, this.newComment)
            .then(this.attachComments.bind(this))
            .then(() => this.resetComment())
            .finally(() => this.stopLoading());
    }

    deleteComment(comment) {
        return this.commentService
            .remove(comment)
            .then(this.removeLocally);
    }

    removeLocally(comment) {
        this.listComments.splice(this.listComments.indexOf(comment), 1);
    }

    attachComments(commentSaved) {
        this.listComments.push(commentSaved);
    }

    stopLoading() {
        this.loading = false;
    }

    resetComment() {
        this.newComment = {note: 5};
        if (this.formComment)
            this.formComment.$setUntouched();
    }
}


angular.module('cf.topic', [
    'cf.common.dataService.commentService',
    'cf.common.dataService.topicService',
    'cf.common.components.starRating',
    'cf.common.components.isLoading',
    'ngRoute',
    'ngMessages'
])
    .config(topicRouteConfig)
    .controller('topicController', topicController);


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
