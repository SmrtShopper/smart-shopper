angular.module('smartShopper', [])
  .controller('GroceryController', ['$scope', function($scope) {
    $scope.items = [
      {description:'ice cream', price:14.95, bought: true, aisle: 3},
      {description:'milk', price:3.49, bought: false, aisle: 5}];
    $scope.addItem = function() {
        $scope.items.push({description: $scope.groceryItem, price:1000000, bought: false});
        $scope.groceryItem = '';
    };
  }]);