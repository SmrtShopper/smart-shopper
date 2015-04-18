angular.module('smartShopper', [])
  .controller('GroceryController', ['$scope', function($scope) {
    // $scope.items = [
    //   {fields:{item_name:'ice cream', bought: true, quantity: 3}},
    //   {fields:{item_name:'milk', bought: false, quantity: 5}}
    // ];
    // $scope.searchResults = [
    //   {fields:{item_name: 'cheese'}},
    //   {fields:{item_name: 'broccoli'}}
    // ];

    $scope.items = JSON.parse(localStorage.getItem("grocery")) || [];

    $scope.search = function() {
      
      var query = document.getElementById("grocItem").value;
      var items_to_return = 3;
      var appId = "feab83eb";
      var appKey = "ecc75d64bf6a77ba3f03d478d4ee943e";
      //search Nutritionix for search results...
      xmlhttp = new XMLHttpRequest();
      xmlhttp.open("POST","https://api.nutritionix.com/v2/natural/",true);
      xmlhttp.setRequestHeader("X-APP-ID", appId);
      xmlhttp.setRequestHeader("X-APP-KEY", appKey);
      xmlhttp.setRequestHeader("Content-Type", "text/plain");
      xmlhttp.send(query);
      xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
          console.log(JSON.parse(xmlhttp.responseText).results);
          $scope.items += JSON.parse(xmlhttp.responseText).results; 
          $scope.$apply();
          console.log($scope.items);
        }
      }

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
      localStorage.setItem("grocery", JSON.stringify($scope.items));

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

