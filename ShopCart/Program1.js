var app = angular.module('myApp', []);

app.controller('TestCtrl', [ '$scope',
    function ($scope) {
    }
]);

app.directive('product', function () {
 
    function linkingFunction(scope, element, attrs) {}

    function controller($scope) {
              $scope.productList=[
        {
            id:0,
            name:"product0",
            price:34,
            qty:1,
        },
        {
            id:1,
            name:"product1",
            price:93,
            qty:1,
        },
        {
            id:3,
            name:"product3",
            price:4,
            qty:1,
        }
        ];   
      $scope.getQty=function(product){
           var idSearch="qty"+product.id;
           $scope.qty= Number(document.getElementById(idSearch).value);   
        }   
        
    }
    return {
        restrict: 'E'
        , template:  '<div name="ProductForm">'+
        '<div ng-model"listOflements">'+
        '<h3 class="titleMain">Product List</h3>'+
                '<div class="product" ng-repeat="product in productList">'+
                    '<b class="title">{{product.name}} </b><br>'+
                    '<b>Price:$</b>{{product.price}}'+
        '<div>qty:<input type="text" " style="width:20px;" value="1" id="qty{{product.id}}" ng-model"qty" ></div>'+
        '<div><input type="submit" value="Add to Cart"  ng-click="getQty(product);addToCart(product,qty)"> </div>'+
                '</div>'+
       ' </div>'
        , scope: {
            addToCart:'='
        }
        , link: linkingFunction
        , controller: controller
    }
});

app.directive('cart', function () {
 
    function linkingFunction(scope, element, attrs) {
        scope.addToCart=function(product,qty){
           qty=Number(qty);
            
            if(qty<1)
                return;
            
            //product already exist
            for(var i in scope.cartList){
                if(product.id == scope.cartList[i].id){
                    scope.cartList[i].qty+=qty;
                    scope.total=scope.getTotal();
                    return;                    
                }
                
            }
            
            //if product doesnt exist
            product.qty=qty;
            scope.cartList.push(product);
            scope.total=scope.getTotal();
             
        }
}

    function controller($scope) {
       ///list of items on the cart        
        $scope.cartList=[
            {
            id:1,
            name:"product1",
            price:93,
            qty:2,
            }];
        
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
        , template:  '<div name="ProductForm">'+
         ' <div ng-model"Cart">'+
        '<h3 class="titleMain">Cart</h3>'+
                '<div ng-repeat="product in cartList">'+
                    '<b class="title">{{product.name}}</b>${{product.price}}'+
                    'qty:<input type="text"  style="width:20px;" value="{{product.qty}}" id="qtyC{{product.id}}">'+
                '</div>'+
        
        '<div><b>total:<b>{{total}}</div><br>'+
               '<div class="center">'+
                '<input class="button" type="submit"  value="save changes" ng-click="update()">'+
                '<input class="button"type="submit"  value="checkout" ng-click="checkOut()" </p>'+
                 '<div>'+
            '</div>'+
                   
        '</div>'
        , scope: {
            addToCart:'='
        }
        , link: linkingFunction
        , controller: controller
    }
});