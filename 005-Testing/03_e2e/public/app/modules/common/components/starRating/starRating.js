angular.module('cf.common.components.starRating', [])
    .directive('starRating', starRatingDirective)
    .controller('starRatingController', starRatingController);

function starRatingDirective() {
    return {
        controller: 'starRatingController',
        templateUrl: 'common/components/starRating/starRating.html',
        scope: true,
        controllerAs: 'src',
        bindToController: {
            note: '=',
            max: '=',
            onChange: '&',
            readonly: '@'
        },
        link: function starRatingLink(scope, element, attr, ctrl) {
            scope.$watch(
                function () {
                    return ctrl.note;
                },
                function () {
                    ctrl.updateStars();
                }
            );
        }
    };
}

function starRatingController() {
    var vm = this;

    vm.isReadonly = angular.isDefined(vm.readonly) && ( vm.readonly === "" || vm.readonly.toLowerCase() === "true" );

    vm.updateStars = function () {
        vm.stars = [];
        for (var i = 0; i < vm.max; i++) {
            var state = i < vm.note;
            vm.stars.push({filled: state});
        }
    };

    vm.changeNote = function (note) {
        if (vm.isReadonly) {
            return;
        }

        vm.note = vm.note === note ? 0 : note;
        /*
         vm.onChange({note : { note : 12, aCustomValue : "yes"}});
         on-change="onChangeNote(note)" ==> note = 12
         http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-3-isolate-scope-and-function-parameters
         */
        (vm.onChange() || angular.noop)(vm.note);
    };
}