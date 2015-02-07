app.directive('product', function () {

    function linkingFunction(scope, element, attrs) {
    }

    function controller($scope) {
        $scope.productList = [
            {
                id:0,
                name:"product0",
                price:34,
                qty:1
            },
            {
                id:1,
                name:"product1",
                price:93,
                qty:1
            },
            {
                id:3,
                name:"product3",
                price:4,
                qty:1
            }
        ];

        $scope.getQty=function(product){
           var idSearch="qty"+product.id;
           $scope.qty= Number(document.getElementById(idSearch).value);
        };

    }
    return {
        restrict: 'E',
        templateUrl: "product.html",
        scope: {
            addToCart:'='
        },
        link: linkingFunction,
        controller: controller
    };
});