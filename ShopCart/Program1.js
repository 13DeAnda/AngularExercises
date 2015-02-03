var app = angular.module('myApp', []);

app.controller('TestCtrl', [ '$scope',
    function ($scope) {
    }
]);

app.directive('testDirec', function () {
    
    
    function linkingFunction(scope, element, attrs) {
    }

    function controller($scope) {
        
        $scope.productList=[
        {
            id:0,
            name:"product0",
            price:34,
            qty:4,
        },
        {
            id:1,
            name:"product1",
            price:93,
            qty:4,
        },
        {
            id:3,
            name:"product3",
            price:4,
            qty:23,
        }
        ];
        ///list of items on the cart        
        $scope.cartList=[
            {
            id:1,
            name:"product1",
            price:93,
            qty:2,
            }];
                
        //adds to shopping cart
        $scope.addToCart=function(product){
            var idSearch="qty"+product.id;
            var qty=Number(document.getElementById(idSearch).value);
            
            if(qty<1)
                return;
            
            //product already exist
            for(var i in $scope.cartList){
                if(product.id == $scope.cartList[i].id){
                    $scope.cartList[i].qty+=qty;
                    $scope.total=$scope.getTotal();
                    return;                    
                }
                
            }
            //if product doesnt exist
            product.qty=qty;
            $scope.cartList.push(product);
            $scope.total=$scope.getTotal();
             
        }
        //update the cart products
        $scope.update=function(){
            var temp=[];
            
            for(var i in $scope.cartList){
                var idSearch="qtyC"+$scope.cartList[i].id;
                $scope.cartList[i].qty=Number(document.getElementById(idSearch).value);
                
                if(($scope.cartList[i].qty>0))
                    temp.push($scope.cartList[i]);
            }
            
            $scope.cartList=temp;
            $scope.total=$scope.getTotal();
        }
        
        
        //sums the total
        $scope.getTotal=function(){
            var total=0;
            for(var i in $scope.cartList)
                total+=$scope.cartList[i].price*$scope.cartList[i].qty;
            return total;       
        }
        
        $scope.total=$scope.getTotal();

        
        
    }
    return {
        restrict: 'E'
        , template: '<div name="ProductForm">'+
        
        '\\\\\Products:\\\\ <div ng-model"listOflements">'+
                '<div ng-repeat="product in productList">'+
                    '<p>{{product.name}} <br>'+
                    'Price: ${{product.price}}'+
                    'qty:<input type="text" " style="width:20px;" value="1" id="qty{{product.id}}" ><br>'+
                    '<input type="submit"  value="Add to Cart" ng-click="addToCart(product)">  </p>'+
                '</div>'+
        
        
        '\\\\\\\Cart:\\\\\\\\\ <div ng-model"Cart">'+
                '<div ng-repeat="product in cartList">'+
                    '<p> {{product.name}}  \t\t   ${{product.price}}'+
                    '\t\t  qty:<input type="text"  style="width:20px;" value="{{product.qty}}" id="qtyC{{product.id}}">'+
                '</div>'+
        
        'total:{{total}}<br>'+
                '<input type="submit"  value="save chanes" ng-click="update()">'+
                '<input type="submit"  value="checkout" ng-click="checkOut()" </p>'+
        
            '</div>'+
                   
        '</div>'
        , scope: {
        }
        , link: linkingFunction
        , controller: controller
    }
});