describe('cf.common.components.starRating', function () {

    var $rootScope, createController, $controller;

    beforeEach(module('cf.common.components.starRating'));
    beforeEach(module('cf.partial'));

    beforeEach(inject(function (_$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
    }));

    describe('starRatingController', function () {

        var $scope;

        beforeEach(inject(function ($controller) {
            $scope = $rootScope.$new();
            createController = $controller('starRatingController', {$scope: $scope}, true);
        }));

        it('should load controller', function () {
            createController.instance.note = 3;
            createController.instance.max = 10;
            createController.instance.onChange = function () {
            };
            createController.instance.readonly = "";

            var vm = createController();

            expect(vm.note).toBe(3);
            expect(vm.max).toBe(10);
            expect(vm.onChange).toBeDefined();
            expect(vm.readonly).toBe("");
            expect(vm.isReadonly).toBe(true);
        });

        it('should generate stars', function () {
            createController.instance.note = 1;
            createController.instance.max = 10;

            var vm = createController();
            vm.updateStars();

            expect(vm.stars[0].filled).toBeTruthy();
            expect(vm.stars[1].filled).toBeFalsy();
        });

        it('should change note', function () {
            createController.instance.note = 1;
            createController.instance.max = 10;
            createController.instance.onChange = function () {
            };

            var vm = createController();
            vm.updateStars();
            vm.changeNote(2);
            vm.updateStars();


            expect(vm.stars[0].filled).toBeTruthy();
            expect(vm.stars[1].filled).toBeTruthy();
            expect(vm.stars[2].filled).toBeFalsy();
        });

        it('should change change note and call external function', function () {
            var spyFunction = jasmine.createSpy('onChange');
            createController.instance.note = 1;
            createController.instance.max = 10;
            createController.instance.onChange = spyFunction;

            var vm = createController();
            vm.updateStars();
            vm.changeNote(2);
            vm.updateStars();


            expect(vm.stars[0].filled).toBeTruthy();
            expect(vm.stars[1].filled).toBeTruthy();
            expect(vm.stars[2].filled).toBeFalsy();
            expect(spyFunction).toHaveBeenCalled();
        });

        it('should restrict change of note', () => {
            var spyFunction = jasmine.createSpy('onChange');
            createController.instance.note = 1;
            createController.instance.max = 10;
            createController.instance.onChange = spyFunction;
            createController.instance.readonly = "";

            var vm = createController();
            vm.updateStars();
            vm.changeNote(2);
            vm.updateStars();


            expect(vm.stars[0].filled).toBeTruthy();
            expect(vm.stars[1].filled).toBeFalsy();
            expect(vm.stars[2].filled).toBeFalsy();
            expect(spyFunction).not.toHaveBeenCalled();
        });

        it('should reset the note', () => {
            createController.instance.note = 1;
            createController.instance.max = 10;
            createController.instance.onChange = function () {
            };

            var vm = createController();
            vm.updateStars();
            vm.changeNote(1);
            vm.updateStars();

            expect(vm.note).toBe(0);
        });

        it('should be read Only with string', () => {
            createController.instance.note = 1;
            createController.instance.max = 10;
            createController.instance.readonly = "TruE";

            var vm = createController();
            vm.changeNote(3);

            expect(vm.note).toBe(1);
        });
    });

    describe('starRatingDirective', function () {
        var element, $scope, ctrl;

        beforeEach(inject(function ($controller, $compile, _$rootScope_) {

            $rootScope = _$rootScope_;
            $rootScope.comment = {
                note: 5
            };

            element = angular.element('<star-rating note="comment.note" max="10"></star-rating>');

            $scope = $rootScope.$new();
            spyOn($scope, '$watch').and.callThrough();
            $compile(element)($scope);
            $rootScope.$digest();
            element.controller();

            $scope = element.isolateScope() || element.scope();
            ctrl = $scope.src;
        }));


        it('should have an isolated scope with src as controllerAs', function () {
            expect($scope.src).toBeDefined();
            expect($scope.$watch).toHaveBeenCalled();
        });

        it('should update-stars', function () {
            spyOn(ctrl, 'updateStars');
            ctrl.note = 6;
            $rootScope.$digest();
            expect(ctrl.updateStars).toHaveBeenCalled();
        });
    });

});