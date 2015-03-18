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

function voiceRec(){
    var recognition = new webkitSpeechRecognition();
    recognition.onresult = function(event) { 
      console.log(event) 
      document.getElementById("grocItem").value = "HEYYY";
     
    }
    recognition.onerror = function(event){
        console.log("Error", event);   
    }
    recognition.start();
}