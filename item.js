angular.module('smartShopper', [])
  .controller('GroceryController', ['$scope', function($scope) {
    $scope.items = [
      {description:'ice cream', price:14.95},
      {description:'milk', price:3.49}];
  }]);