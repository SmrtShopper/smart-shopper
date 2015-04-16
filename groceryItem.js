angular.module('smartShopper', [])
  .controller('GroceryController', ['$scope', function($scope) {
    var login = 2;
    $scope.items = [
      {description:'ice cream', price:14.95, bought: true, aisle: 3},
      {description:'milk', price:3.49, bought: false, aisle: 5}];
    $scope.addItem = function() {
          var itemId = document.getElementById("grocItem").value;
          var req = new XMLHttpRequest();
          var url = "https://grocery-server.herokuapp.com/addGrocery";
          var params="login=" + login + "&itemId=" + itemId;
          req.open("POST", url, true);
          req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          req.send(params);
          alert("hello");
          alert(req.response);
          if (req.status!=200){
            alert('Send failed');
          }
          
          $scope.items.push({description: document.getElementById("grocItem").value, price:1000000, bought: false});
          document.getElementById("grocItem").value = '';
    };
    $scope.deleteItem = function(idx) {
        alert(idx);
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

