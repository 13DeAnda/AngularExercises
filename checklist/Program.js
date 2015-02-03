var app = angular.module('myApp', []);

app.controller('TestCtrl', [ '$scope',
    function ($scope) {
    }
]);

app.directive('testDirec', function () {
    
    
    function linkingFunction(scope, element, attrs) {
    }

    function controller($scope) {
        $scope.showAlreadyAdded=false;
        $scope.itemsList=[
        {
            item:"maria1",
            submitted:false,
            checked:false
        },
        {
            item:"maria2",
            submitted:false,
            checked:false
        },
        {
            item:"maria3",
            submitted:true,
            checked:false
        }
        ];
                
        //adds on the list to submit
        $scope.addItem =function(){
            $scope.itemsList.push({
                    item: $scope.newItem,
                    submitted:false,
                    checked:false
                });
             $scope.newItem="";            
        }
        //filters the displayed items
        $scope.filterSubmitted=function(item){
            if($scope.showAlreadyAdded)
                return true;
            return !item.submitted;
            
        }
        //when chekbox is clicked change flag
        $scope.showAlreadyAddedF=function(){
                $scope.showAlreadyAdded=!$scope.showAlreadyAdded;
        }
        //checks and uncheks an item
        $scope.checkItem=function(item){
            item.checked=!item.checked;
        }
        
        //changes items selected to submitted true
        $scope.submitList=function(){
            for(var i in $scope.itemsList)
                if($scope.itemsList[i].checked){
                     $scope.itemsList[i].submitted=true;
                     $scope.itemsList[i].checked=false;
                }
                                
        }
        //deletes from the list the selected items
        $scope.deleteSelected=function(){
            var newList = [];
            for(var i in $scope.itemsList) { 
                if(!$scope.itemsList[i].checked){
                     newList.push($scope.itemsList[i]);
                }
            }
            $scope.itemsList =newList;
                
         }
    }
    return {
        restrict: 'E'
        , template: '<div name="listForm">'+
            '<input type="text" ng-model="newItem">'+
            '<input type="submit"  value="Add item" ng-click="addItem()">'+
            '<input type="checkbox"  ng-click="showAlreadyAddedF()">ShowItemsAlreadyAdded</p>'+
        
            '<div ng-model"listOflements">'+
                '<div ng-repeat="item in itemsList |filter: filterSubmitted">'+
                    '<input type="checkbox" ng-click="checkItem(item)" ng-show="{{!item.submitted}}"> {{item.item}}'+
                '</div>'+
            '</div>'+
                   
        '<input type="submit"  value="submitList" ng-click="submitList()">'+
        '<input type="submit" value="delete selected" ng-click="deleteSelected()">'+
        '</div>'
        , scope: {
        }
        , link: linkingFunction
        , controller: controller
    }
});