angular.module('smartShopper', [])
  .controller('GroceryController', ['$scope', function($scope) {
    $scope.items = [
      {description:'ice cream', bought: true, quantity: 3},
      {description:'milk', bought: false, quantity: 5}
    ];
    $scope.searchResults = [
      {description: 'cheese'},
      {description: 'broccoli'}
    ];

    $scope.search = function() {
      
      var query = document.getElementById("grocItem").value;
      //search Nutritionix for search results...

      document.getElementById("grocItem").value = '';
    }

    $scope.prependToList = function(idx) {
      var item = $scope.searchResults[idx];

      if ($scope.items.indexOf(item) == -1) {
        $scope.items.unshift(item);
      }
      else {
        alert("Oops, that's already in your list!");
      }

    /*
    $scope.prependItem = function() {
      var item_title = document.getElementById("grocItem").value;
      if (item_title != "") {
              $scope.items.unshift({description: item_title, bought: false});
      document.getElementById("grocItem").value = '';
      }
    */
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

