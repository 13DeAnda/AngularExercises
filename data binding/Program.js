var app = angular.module('myApp', []);

app.controller('TestCtrl', [ '$scope',
    function ($scope) {
    }
]);

app.directive('program', function () {

    function linkingFunction(scope, element, attrs) {
    }
    function controller($scope) {

    }
    return {
        restrict: 'E',
        templateUrl:"program.html",
        scope: {},
        link: linkingFunction,
        controller: controller
    };
});