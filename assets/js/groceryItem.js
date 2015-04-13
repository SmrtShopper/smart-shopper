angular.module('smartShopper', [])
  .controller('GroceryController', ['$scope', function($scope) {
    $scope.items = [
      {description:'ice cream', bought: true, quantity: 3},
      {description:'milk', bought: false, quantity: 5}];
    $scope.prependItem = function() {
      $scope.items.unshift({description: document.getElementById("grocItem").value, bought: false});
      document.getElementById("grocItem").value = '';
    };
    $scope.deleteItem = function(idx) {
        $scope.items.splice(idx, 1);
    };


    $scope.voiceRec = function(){
        
      var recognition = new webkitSpeechRecognition();
      recognition.onresult = function(event) { 
        console.log(event) 
        if (event.results[0].isFinal) {
            //add to textbox
            document.getElementById("grocItem").value = event.results[0][0].transcript;
            //auto add? probably don't want to do that
            //$scope.items.push({description: $scope.groceryItem, price:1000000, bought: false});
        }
      }
      recognition.onerror = function(event){
          console.log("Error", event);   
      }
      recognition.start();
      };
    }]);

