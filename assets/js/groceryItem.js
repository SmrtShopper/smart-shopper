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

    $scope.alldata = JSON.parse(localStorage.getItem("grocery")) || [];

    $scope.search = function() {
      
      var query = document.getElementById("grocItem").value;
      var allitemstr = query + "\n";
      if ($scope.alldata.results) {
        for (var i = 0; i < $scope.alldata.results.length; i++) {
        allitemstr += $scope.alldata.results[i].parsed_query.query + "\n";
        }
      }
      
      console.log(allitemstr);
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
          console.log(JSON.parse(xmlhttp.responseText));
          alldata = JSON.parse(xmlhttp.responseText); 
          $scope.alldata = alldata;
          $scope.$apply();
          console.log($scope.alldata.results);
          localStorage.setItem("grocery", JSON.stringify($scope.alldata));
        }

      }
      xmlhttp.send(allitemstr);

      // var allitemstr;
      // for (var i = 0; i < $scope.items.length; i++) {
      //   allitemstr += "\n" + $scope.items[i].parsed_query.food;
      // }
      //xmlhttp.onreadystatechange=function() 
      
      //xmlhttp.send(allitemstr);

      //query = 
      $scope.updateGraphs();


      document.getElementById("grocItem").value = '';
    };

    $scope.updateGraphs = function(){
      var total = $scope.alldata.total;
      var labels = [];
      var data = [];


      for (var i = 0; i < total.nutrients.length; i++) {
        if (total.nutrients[i].unit == "g") {
          labels.push(total.nutrients[i].name);
          data.push(total.nutrients[i].value);
        }
      }
      console.log(total);

      $scope.labels = labels;
      $scope.data = data;
    }

    $scope.$on('$viewContentLoaded', function() {
      $scope.updateGraphs();
    });
   


    $scope.deleteItem = function(idx) {
      $scope.alldata.results.splice(idx, 1);
      localStorage.setItem("grocery", JSON.stringify($scope.alldata));
      $scope.updateGraphs();
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




