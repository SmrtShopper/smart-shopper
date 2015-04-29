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
    $scope.alldata = JSON.parse(localStorage.getItem("grocery")) || null;

    console.log($scope.alldata);
    
    $scope.search = function() {
      var query = document.getElementById("grocItem").value;
      $scope.getTotals(query);
      document.getElementById("grocItem").value = '';

    };

    $scope.getTotals = function(query) {
      if ($scope.alldata == null){
        $scope.alldata = [];
      }
      var allitemstr = query + "\n";
      if ($scope.alldata.results) {
        for (var i = 0; i < $scope.alldata.results.length; i++) {
        allitemstr += $scope.alldata.results[i].parsed_query.query + "\n";
        }
      }

      var appId = "feab83eb";
      var appKey = "ecc75d64bf6a77ba3f03d478d4ee943e";
      //search Nutritionix for search results...
      $.ajax({
            type: "POST",
            url: "https://grocery-server.herokuapp.com/addGrocery/",
            data: {login: '1', grocery: allitemstr},
            dataType: "text"
          })
      .done (function(response, status){
        alldata = JSON.parse(response);
        $scope.alldata = alldata;
        $scope.updateGraphs();
        $scope.$digest();
        document.getElementById("grocItem").value = '';
        localStorage.setItem("grocery", JSON.stringify($scope.alldata));
      })
      .fail (function (response,status){
         bootbox.alert("No results found!");
      });
      // xmlhttp = new XMLHttpRequest();
      // xmlhttp.open("POST","https://api.nutritionix.com/v2/natural/",true);
      // xmlhttp.setRequestHeader("X-APP-ID", appId);
      // xmlhttp.setRequestHeader("X-APP-KEY", appKey);
      // xmlhttp.setRequestHeader("Content-Type", "text/plain");
      //   if (xmlhttp && xmlhttp.readyState == 4 && xmlhttp.status == 200){
      //     alldata = JSON.parse(xmlhttp.responseText);

      //     // $scope.alldata = $scope.alldata.map(function(data) {
      //     //   return data.map(function (y) {
      //     //     console.log(y);
      //     //     return y;
      //     //   });
      //     // });


      //     $scope.alldata = alldata;
      //     $scope.updateGraphs();
      //     $scope.$digest();
      //     document.getElementById("grocItem").value = '';
      //     localStorage.setItem("grocery", JSON.stringify($scope.alldata));
      //   } else if (xmlhttp && xmlhttp.readyState == 4 && xmlhttp.status == 400){
      //       bootbox.alert("No results found!");
      //       return;
      //   }

      // }
      // xmlhttp.send(allitemstr);
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

    $scope.initializeGraphs = function() {

      $scope.data = [];
      $scope.labels = [];
      for (var i = 0; i < 860; i++) {
        $scope.data[i] = 0;
        $scope.labels[i] = "";
      }

      for (var i = 0; i < nutrient_labels.length; i++) {
        current = nutrient_labels[i];
        $scope.labels[current.id] = current.name;
      }

      $scope.options = {
        animationEasing: "easeOutQuart",
        segmentShowStroke: false,
        responsive: true,
      };
      if ($scope.alldata){
        $scope.updateGraphs();
      }
      else {
        //display no data warning

      }
    };

    $scope.updateGraphs = function(){

      get_data_and_labels($scope.alldata.total.nutrients, "g", 0.3);
    };

    $scope.$on('$viewContentLoaded', function() {
      $scope.updateGraphs();
    });

    function get_data_and_labels(nutrientsData, unit, minValue) {
      // nutrientsData is an array, unit is a string, minValue is a float

      if (!nutrientsData) {
        //do something here to indicate no data and prompt to add data
        alert("NO DATA");
        return;
      }

      else {
        var id_index = -1;
        for (var i = 0; i < nutrientsData.length; i++) {
          if (nutrientsData[i].unit == unit && nutrientsData[i].value > minValue) {
            id_index = nutrientsData[i].attr_id;
            $scope.data[id_index] = parseFloat( (nutrientsData[i].value).toFixed(2) );
          }
        }
      //   var numEmpty = 0;
      //   var numFilled = 0;
      //   for (var i = 0; i < $scope.data.length; i++) {
      //     if ($scope.data[i] == 0) {
      //       numEmpty++;
      //     }
      //     else {
      //       numFilled++;
      //     }
      //   }
      //   console.log(numFilled + " filled, " + numEmpty + " empty.");


        
      }

    };
   


    $scope.deleteItem = function(idx) {
      if ($scope.alldata.results.length == 1){
        $scope.alldata = null;
        $scope.initializeGraphs();
        localStorage.removeItem("grocery");
      }
      else {
        $scope.alldata.results.splice(idx, 1);
        //get records of all totals again
        $scope.getTotals("");
        localStorage.setItem("grocery", JSON.stringify($scope.alldata));
        $scope.updateGraphs();
      }
      
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



