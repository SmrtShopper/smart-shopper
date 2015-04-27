angular.module('smartShopper', ["chart.js", "ui.bootstrap", 'angularModalService'])
  .controller('GroceryController', ['$scope', function($scope, ModalService) {
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
          alldata = JSON.parse(xmlhttp.responseText);
          console.log(alldata)
          $scope.alldata = alldata;
          $scope.updateGraphs();
          $scope.$apply();
          document.getElementById("grocItem").value = '';
          localStorage.setItem("grocery", JSON.stringify($scope.alldata));
        } else if (xmlhttp && xmlhttp.readyState == 4 && xmlhttp.status == 400){
            bootbox.alert("No results found!");
            return;
        }

      }
      xmlhttp.send(allitemstr);
    };

    $scope.sendtophone = function(){
      bootbox.prompt("Please enter your phone number", function(result) {
        if (result === null) {

        }
        else {
          var allitemstr = '';
          if ($scope.alldata.results) {
           for (var i = 0; i < $scope.alldata.results.length; i++) {
              allitemstr += $scope.alldata.results[i].parsed_query.query + "\n";
            }
          }
          $.ajax({
            type: "POST",
            url: "http://textbelt.com/text",
            data: {number:result, message:allitemstr},
            success: bootbox.alert("Message Sent!"),
            dataType: "text"
          });
        }
        
      });
      
    };



    $scope.updateGraphs = function(){
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

      // call modularized nutrients-parsing function
      var arr = get_data_and_labels(total.nutrients, "g", 0.3);


      $scope.labels = arr[0];
      $scope.data = arr[1];
    };

    $scope.$on('$viewContentLoaded', function() {
      $scope.updateGraphs();
    });

    function get_data_and_labels(nutrientsData, unit, minValue) {
      // nutrientsData is an array, unit is a string, minValue is a float
      var labels = [];
      var data = [];
      for (var i = 0; i < nutrientsData.length; i++) {
        if (nutrientsData[i].unit == unit && nutrientsData[i].value > minValue) {
          labels.push(nutrientsData[i].name);
          data.push((nutrientsData[i].value).toFixed(2)); // round to 2 decimal places
        }
      }
      return [labels, data];
    };
   


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






