app.directive('testDirec', function () {

    function linkingFunction(scope, element, attrs) {
    }

    function controller($scope) {
        $scope.showAlreadyAdded = false;
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
        };
        //filters the displayed items
        $scope.filterSubmitted=function(item){
            if($scope.showAlreadyAdded){
                return true;
            }

            return !item.submitted;

        };

        //changes items selected to submitted true
        $scope.submitList=function(){
            for(var i in $scope.itemsList){
                if($scope.itemsList[i].checked){
                     $scope.itemsList[i].submitted=true;
                     $scope.itemsList[i].checked=false;
                }
            }
        };
        //deletes from the list the selected items
        $scope.deleteSelected=function(){
            var newList = [];
            for(var i in $scope.itemsList) {
                if(!$scope.itemsList[i].checked){
                     newList.push($scope.itemsList[i]);
                }
            }
            $scope.itemsList =newList;

         };
    }
    return {
        restrict: 'E',
        templateUrl:"checkList.html",
        scope: {
        },
        link: linkingFunction,
        controller: controller,
    };
});