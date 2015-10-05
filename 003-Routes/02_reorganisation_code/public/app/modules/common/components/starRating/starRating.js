angular.module('cf.common.components.starRating', [])
        .directive('starRating', starRatingDirective)
        .controller('starRatingController', starRatingController);

function starRatingDirective() {
  return {
    controller: 'starRatingController',
    templateUrl: 'common/components/starRating/starRating.html',
    scope: true,
    controllerAs : 'src',
    bindToController : {
      note: '=',
      max: '=',
      onChange: '&',
      readonly : '@'
    },
    link : function starRatingLink(_, __, ___, ctrl) {
      //ctrl.readOnly = attr.hasOwnProperty('readonly') && (attr.readonly === "" || attr.readonly.toLowerCase() === "true");
      ctrl.isReadonly = angular.isDefined(ctrl.readonly) && ( ctrl.readonly === "" || ctrl.readonly.toLowerCase() === "true" );
    }
  };
}

function starRatingController($scope) {
  var vm = this;

  vm.updateStars = function() {
    vm.stars = [];
    for(var i = 0; i < vm.max; i++) {
      var state = i < vm.note;
      vm.stars.push({filled: state});
    }
  };

  vm.changeNote = function(note) {
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

  $scope.$watch(function() { return vm.note; }, function(newVal) {
    if(angular.isNumber(newVal)) {
      vm.updateStars();
    }
  });
}