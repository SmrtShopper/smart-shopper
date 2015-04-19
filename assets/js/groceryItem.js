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
      $scope.getTotals(query);
      document.getElementById("grocItem").value = '';
    };

    $scope.getTotals = function(query) {
      var allitemstr = query + "\n";
      if ($scope.alldata.results) {
        for (var i = 0; i < $scope.alldata.results.length; i++) {
        allitemstr += $scope.alldata.results[i].parsed_query.query + "\n";
        }
      }
      
      console.log(allitemstr);
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
          document.getElementById("grocItem").value = '';
          console.log($scope.alldata.results);
          $scope.updateGraphs();
          localStorage.setItem("grocery", JSON.stringify($scope.alldata));
        }

      }
      xmlhttp.send(allitemstr);
    }

    $scope.updateGraphs = function(){
      console.log("updating Graphs!");
      console.log($scope.alldata.total);
      var total = $scope.alldata.total;
      var labels = [];
      var data = [];

      if (!total) {
        //do something here to indicate no data and prompt to add data
        var labels = ["No Data"];
        var data = ["1"];
        return;
      }


      for (var i = 0; i < total.nutrients.length; i++) {
        if (total.nutrients[i].unit == "g") {
          labels.push(total.nutrients[i].name);
          data.push(total.nutrients[i].value);
        }
      }
      console.log(data);

      $scope.labels = labels;
      $scope.data = data;
    }

    $scope.$on('$viewContentLoaded', function() {
      $scope.updateGraphs();
    });
   


    $scope.deleteItem = function(idx) {
      if ($scope.alldata.results.length == 1){
        $scope.alldata.results = [];
        $scope.alldata.total = [];
        localStorage.removeItem("grocery");
      }
      else {
        $scope.alldata.results.splice(idx, 1);
        //get records of all totals again
        $scope.getTotals("");
        localStorage.setItem("grocery", JSON.stringify($scope.alldata));
        $scope.updateGraphs();
      }
      $scope.$apply();
      
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




