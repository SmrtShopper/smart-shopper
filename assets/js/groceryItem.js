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

    $scope.items = localStorage.getItem("grocery");
    $scope.searchResults = [];

    $scope.search = function() {
      
      var query = document.getElementById("grocItem").value;
      var items_to_return = 3;
      var appId = "feab83eb";
      var appKey = "ecc75d64bf6a77ba3f03d478d4ee943e";
      //search Nutritionix for search results...
      xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET","https://api.nutritionix.com/v1_1/search/" + query +
         "?results=0%3A" + items_to_return + 
         "&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=" + appId 
         + "&appKey=" + appKey,true);
      xmlhttp.send();
      xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
          $scope.searchResults = JSON.parse(xmlhttp.responseText).hits; 
          $scope.$apply();
          console.log($scope.searchResults);
        }
      }

      document.getElementById("grocItem").value = '';
    }

    $scope.prependToList = function(idx) {
      var item = $scope.searchResults[idx];

      if (!($scope.items) || $scope.items.indexOf(item) == -1) {
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

