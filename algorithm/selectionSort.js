var app = angular.module('myApp', []);

app.controller('TestCtrl', [ '$scope',
    function ($scope) {
    }
]);

app.directive('selectionSort', function () {

    function linkingFunction(scope, element, attrs) {
    }
    function controller($scope) {
        $scope.nextButtonDisabled = true;
        $scope.backButtonDisabled = true;
        $scope.arrayInputList = [];

        $scope.inputList = [
            {
                value:45,
                color:"black",
            },
            {
                value:65,
                color:"black",
            },
            {
                value:125,
                color:"black",
            },
            {
                value:5,
                color:"black",
            },
            {
                value:4,
                color:"black",
            },
            {
                value:55,
                color:"black",
            },
        ];

        //performs selectionSort
        $scope.sort = function(){
            for (var i = 0; i < $scope.inputList.length; i++) {
                $scope.smallestValueIndex = i;
                $scope.inputList[i].color="red";

                for (var k = i+1; k < $scope.inputList.length; k++) {
                    $scope.inputList[k].color="blue";

                    $scope.arrayInputList.push(angular.copy($scope.inputList));

                    if ($scope.inputList[k].value < $scope.inputList[$scope.smallestValueIndex].value) {

                        $scope.inputList[$scope.smallestValueIndex].color="black";
                        $scope.smallestValueIndex = k;
                        $scope.inputList[k].color="red";

                        $scope.arrayInputList.push(angular.copy($scope.inputList));
                    }
                    else{
                        $scope.inputList[k].color="black";
                    }
                }
                if ($scope.smallestValueIndex !== i) {
                    var tmp = $scope.inputList[i];
                    $scope.inputList[i] = $scope.inputList[$scope.smallestValueIndex];
                    $scope.inputList[$scope.smallestValueIndex] = tmp;
                }
                $scope.inputList[i].color="gray";

                //if is the last two elements and they're sorted
                if($scope.inputList.length-2==i){
                    $scope.inputList[i+1].color="gray";
                    $scope.arrayInputList.push(angular.copy($scope.inputList));
                }
            }
        };

        $scope.start=function(){
            $scope.arrayInputList = [];
            $scope.nextButtonDisabled = false;
            $scope.sort();
            $scope.currentStep = 0;
            $scope.arrayOnView = $scope.arrayInputList[$scope.currentStep];
        };
        $scope.next=function(){
            if($scope.currentStep < $scope.arrayInputList.length - 1){
                $scope.backButtonDisabled = false;
                $scope.currentStep += 1;
                $scope.arrayOnView = $scope.arrayInputList[$scope.currentStep];
            }
            else{
                $scope.nextButtonDisabled = true;
            }
        };
        $scope.back=function(){
            if($scope.currentStep > 0){
                $scope.nextButtonDisabled = false;
                $scope.currentStep -= 1;
                $scope.arrayOnView = $scope.arrayInputList[$scope.currentStep];
            }
            else{
                $scope.backButtonDisabled = true;
            }
        };

        //gets
        $scope.getValue=function(val){
            if(val.color == "red"){
                $scope.currentSmallestDisplayed=val.value+" is the current smallest";
            }
            else if(val.color == "blue"){
                $scope.currentEvaluedDisplayed=val.value+" is next element to check";
            }

        };
    }
    return {
        restrict: 'E',
        templateUrl:"buttons.html",
        scope: {},
        link: linkingFunction,
        controller: controller
    };
});