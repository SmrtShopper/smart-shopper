angular.module('smartShopper', ["chart.js"])
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
      xmlhttp.onreadystatechange=function() {
        if (xmlhttp && xmlhttp.readyState == 4 && xmlhttp.status == 200){
          console.log(JSON.parse(xmlhttp.responseText).results[0]);
          item = JSON.parse(xmlhttp.responseText).results[0]; 
          $scope.items.unshift(item);
          $scope.$apply();
          console.log($scope.items);
          localStorage.setItem("grocery", JSON.stringify($scope.items));
        }
      }
     xmlhttp.send(query);

      document.getElementById("grocItem").value = '';
    };

    //charts
    $(document).ready(function() {
      var data = $scope.items[0];
      var ctx = $("#modular-doughnut").get(0).getContext("2d");
      var myDoughnutChart = new Chart(ctx).Doughnut(data);
    });
    
    // console.log($scope.items);
    // var item = $scope.items[0];
    // console.log(item);
    // var labels = [];
    // var data = [];


    // for (var i = 0; i < item.nutrients.length; i++) {
    //   if (item.nutrients[i].unit == "g") {
    //     labels.splice(i, 0, item.nutrients[i].name);
    //     data.splice(i, 0, item.nutrients[i].value);
    //   }
    // }
    // console.log(data);

    // $scope.labels = labels;
    // $scope.data = data;


    $scope.deleteItem = function(idx) {
      $scope.items.splice(idx, 1);
    };


    $scope.voiceRec = function(){
        
      var recognition = new webkitSpeechRecognition();
      recognition.onresult = function(event) { 
        console.log(event) 
        if (event.results[0].isFinal) {
            document.getElementById("grocItem").value = event.results[0][0].transcript;
        }
      }
      recognition.onerror = function(event){
          console.log("Error", event);   
      }
      recognition.start();
      };
    }]);




