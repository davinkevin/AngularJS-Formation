angular.module('cf.common.components.isLoading', [])
    .directive('isLoading', isLoadingDirective);

function isLoadingDirective() {
    return {
        scope: {
            isLoading: '='
        },
        link: isLoadingLink
    };
}

function isLoadingLink(scope, element) {
    var classToToggle = 'glyphicon glyphicon-refresh is-loading';
    scope.$watch('isLoading', function (newval, oldval) {
        if (newval) {
            element.addClass(classToToggle);
        } else {
            element.removeClass(classToToggle);
        }
    });
}
