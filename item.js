angular.module('groceries', [])
  .controller('GroceryController', ['$scope', function($scope) {
    $scope.groceries = [
      {description:'ice cream', price:14.95},
      {description:'apples', price:0.55}];
  };