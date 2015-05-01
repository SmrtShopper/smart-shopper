var graph = 1;

angular.module('smartShopper', ["chart.js"])
  .controller('GroceryController', ['$scope', function($scope, ModalService) {
    $scope.initializeGraphs = function() {
      // $scope.show1();

      $scope.radarColors = [
        {
          fillColor: 'rgba(220,220,220,.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
        }, 
        {
          fillColor: 'rgba(151,187,205,.2)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
        }
      ];

      $scope.radarSeries = ["Balanced Diet", "Your Diet"];


      $scope.data1 = [[],[]];
      $scope.labels1 = [];
      $scope.nutrients1 = [];
      var radar1size = 5;

      $scope.data2 = [[],[]];
      $scope.labels2 = [];
      $scope.nutrients2 = [];
      var radar2size = 5;

      $scope.data3 = [[],[]];
      $scope.labels3 = [];
      $scope.nutrients3 = [];
      var radar3size = 6;
      
      for (var i = 0; i < radar_labels.length; i++) {
        if (i < radar1size) {
          $scope.nutrients1[i] = radar_labels[i];
          $scope.labels1[i] = "% " + radar_labels[i].name;
        }
        else if (i < radar1size + radar2size) {
          $scope.nutrients2[i - radar1size] = radar_labels[i];
          $scope.labels2[i - radar1size] = "% " + radar_labels[i].name;
        }
        else if (i < radar1size + radar2size + radar3size) {
          var offset = radar2size + radar3size;
          $scope.nutrients3[i - offset] = radar_labels[i];
          $scope.labels3[i - offset] = "% " + radar_labels[i].name;
        }

      }

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
        onAnimationComplete: function(){},
        animateRotate : false,
        animationEasing : "easeOutQuart",
        segmentShowStroke: false,
        responsive: true,
      };
      if ($scope.alldata != null && $scope.alldata.total != null){
        $scope.updateGraphs();
      }
      
      // $scope.$apply;
      $scope.$digest;
    };




    $scope.show1 = function() {
      graph = 1;
      $("#radar1").show();
      $("#radar2").hide();
      $("#radar3").hide();
      $("#doughnut").hide();
      $("#radar1").css('visibility', 'visible');
      $("#radar2").css('visibility', 'visible');
      $("#radar3").css('visibility', 'visible')
      $("#doughnut").css('visibility', 'visible');
    };

    $scope.show2 = function() {
      graph = 2;
      $("#radar1").hide();
      $("#radar2").show();
      $("#radar3").hide();
      $("#doughnut").hide();
      $("#radar1").css('visibility', 'hidden');
      $("#radar2").css('visibility', 'visible');
      $("#radar3").css('visibility', 'hidden')
      $("#doughnut").css('visibility', 'hidden');
    };

    $scope.show3 = function() {
      graph = 3;
      $("#radar1").hide();
      $("#radar2").hide();
      $("#radar3").show();
      $("#doughnut").hide();
      $("#radar1").css('visibility', 'hidden');
      $("#radar2").css('visibility', 'hidden');
      $("#radar3").css('visibility', 'visible')
      $("#doughnut").css('visibility', 'hidden');
    };
    $scope.show4 = function() {
      graph = 4;
      $("#radar1").hide();
      $("#radar2").hide();
      $("#radar3").hide();
      $("#doughnut").show();
      $("#radar1").css('visibility', 'hidden');
      $("#radar2").css('visibility', 'hidden');
      $("#radar3").css('visibility', 'hidden')
      $("#doughnut").css('visibility', 'visible');
    };

    $scope.hide = function() {
      $("#radar1").show();
      $("#radar2").css('visibility', 'hidden');
      $("#radar3").css('visibility', 'hidden')
      $("#doughnut").css('visibility', 'hidden');
    }
    $scope.hideall = function(){
      $("#charts").css('visibility', 'hidden');
      $("#radar1").css('visibility', 'hidden');
      $("#radar2").css('visibility', 'hidden');
      $("#radar3").css('visibility', 'hidden')
      $("#doughnut").css('visibility', 'hidden');
    }
    $scope.visibleall = function(){
      $("#charts").css('visibility', 'visible');
      $("#radar1").css('visibility', 'visible');
      $("#radar2").css('visibility', 'visible');
      $("#radar3").css('visibility', 'visible')
      $("#doughnut").css('visibility', 'visible');
    }
    $scope.hide();
    // $scope.initializeGraphs();
    
    $scope.$on('create', function (event, chart) {

      if (chart.id == 'chart-15') {
        $scope.options.onAnimationComplete = function(){
          $scope.show1();
        }


      }
    });


    $scope.setupID = function () {
      if ($scope.id) {
        //get all groceries
        $.ajax({
              type: "GET",
              url: "https://grocery-server.herokuapp.com/getGrocery/",
              data: {
                "login" : $scope.id
              }
            })
            .done (function(data, status){
                $scope.alldata = data;
                //check if data empty
                if (jQuery.isEmptyObject($scope.alldata)) {
                  $scope.hideall();
                }
                $scope.initializeGraphs();
                $scope.$digest();
            })
            .fail (function (response,status){
               bootbox.alert("Server Down!");
            });

      } else {
          $scope.getUID(); 
      }
      

    };

    $scope.welcome = function() {
      introJs().start();
    };
   

    $scope.getUID = function() {
      $.ajax({
            type: "GET",
            timeout: 10000, 
            url: "http://grocery-server.herokuapp.com/getUID/",
          })
      .done (function(uid, status){
          localStorage.setItem("id", uid);
          $scope.id = uid;
          $scope.alldata = "{}";
          $scope.initializeGraphs();
          $scope.show1();
          $scope.$digest;
          $scope.welcome();
      })
      .fail (function (response,status){
         bootbox.alert("Server Down!");
      });

    };

    //Initialization

    if (location.search.substring('?').split('=').length == 2 && location.search.substring('?').split('=')[0] == '?uid') {
      $.ajax({
            type: "GET",
            url: "https://grocery-server.herokuapp.com/checkUID/",
            data: {
              "login" : location.search.substring('?').split('=')[1]
            }
          })
          .done (function(data, status){
              if (data == "1") {
                //valid id
                $scope.id = location.search.substring('?').split('=')[1];
                localStorage.setItem("id", $scope.id);
              } 
              else {
                bootbox.alert("Oops! That's not a valid link. Check the link and try again!");
                $scope.id = localStorage.getItem("id");
              }
              $scope.setupID();
          })
          .fail (function (response,status){
             bootbox.alert("Server Down!");
      });
    } else {
      $scope.id = localStorage.getItem("id");
      $scope.setupID();
    }

    
    $scope.search = function() {
      var query = document.getElementById("grocItem").value;
      //$scope.getTotals(query);
      if (query != ""){
        $.ajax({
              type: "POST",
              url: "http://grocery-server.herokuapp.com/addGrocery/",
              data: {login: $scope.id, grocery: query},
              dataType: "text"
            })
        .done (function(response, status){
          alldata = JSON.parse(response);
          if (alldata.error == null){
            if (alldata == "{}") {
              bootbox.alert("Please enter an item!");
            } else {
              $scope.alldata = alldata;
              $scope.updateGraphs();
              $scope.$digest();
              $scope.visibleall();
              if (graph == 1)
                $scope.show1();
              else if (graph == 2)
                $scope.show2();
              else if (graph == 3)
                $scope.show3();
              else
                $scope.show4();

            }
            document.getElementById("grocItem").value = '';
          }
          else {
            bootbox.alert("No results found!");
          }
          
        })
        .fail (function (response,status){
           bootbox.alert("Server Down!");
        });
      }else {
        bootbox.alert("Please enter an item!");
      }
      document.getElementById("grocItem").value = '';

    };

    $scope.sendtophone = function(){
      num = localStorage.getItem("phone");
      bootbox.prompt({
        title: "Please enter your phone number",
        value: num,
        callback: function(result) {
          if (result === null) {
            //ignore no input
          }
          else {
            num = result;
            localStorage.setItem("phone", num); 

            address = location.origin + location.pathname + "?uid=" + $scope.id;
            $.ajax({
                  type: "GET",
                  url: "https://grocery-server.herokuapp.com/sendSMS/",
                  data: {phone:num, login:$scope.id, url: address},
                  success: function(res) {
                    if (res == "success"){
                      bootbox.alert("Message Sent!");
                    }
                    else {
                      bootbox.alert("Message not sent! Please check phone number and try again.");
                    }
                    
                  },
                  dataType: "text"
           }); 
          }
        }
      });
    };


    $scope.updateGraphs = function(){
      if ($scope.alldata && $scope.alldata.total) {
        $("#radar1 .panel-body p").remove();
        $("#radar2 .panel-body p").remove();
        $("#radar3 .panel-body p").remove();
        $scope.data1 = updateRadar($scope.alldata.total.nutrients, $scope.data1, $scope.nutrients1, $scope.labels1, "1");
        $scope.data2 = updateRadar($scope.alldata.total.nutrients, $scope.data2, $scope.nutrients2, $scope.labels2, "2");
        $scope.data3 = updateRadar($scope.alldata.total.nutrients, $scope.data3, $scope.nutrients3, $scope.labels3, "3");
        updateDoughnut($scope.alldata.total.nutrients, "g", 0.3);
      } 
    };

    $scope.$on('$viewContentLoaded', function() {
      $scope.updateGraphs();
    });

    function updateRadar(nutrientsData, data, nutrients_to_use, label, id) {
      if (!nutrientsData) {
        //do something here to indicate no data and prompt to add data
        alert("NO DATA");
        return;
      }
      else {
        data = [[],[]];
        var totalCalories = -1;
        for (var i = 0; i < 7; i++) {
          if (nutrientsData[i].attr_id == 208) {
            totalCalories = nutrientsData[i].value;
            break;
          }
        }

        // create goal data and user's data
        for (var i = 0; i < nutrients_to_use.length; i++) {
          for (var j = 0; j < nutrientsData.length; j++) {
            if (nutrientsData[j].attr_id == nutrients_to_use[i].id) {
              var goalData = nutrients_to_use[i].ratio * totalCalories;
              var userData = nutrientsData[j].value / goalData;
              goalData = parseFloat((goalData).toFixed(2));
              userData = parseFloat((100*userData).toFixed(2));
              data[0].push(100);
              data[1].push(userData);
              $("#radar"+id+" .labelSection").append("<p>"+label[i].substring(2)+":</p>");
              $("#radar"+id+" .dataSection").append("<p><span style='color:"+calculateColor(userData)+"'>"+userData+"</span>"+"%</p>");
            }
          }
        }

        return data;

      }
    }

    function calculateColor(data) {
      var red = Math.abs(parseInt(data*5.1-510));
      if (red > 255) {
        red = 255;
      }
      else if (red < 0) {
        red = 0;
      }
      return ("rgb("+red+",0,0)");
    }

    function updateDoughnut(nutrientsData, unit, minValue) {
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



      }

    };
   


    $scope.deleteItem = function(idx) {
     $.ajax({
            type: "POST",
            url: "http://grocery-server.herokuapp.com/deleteGrocery/",
            data: {login: $scope.id, idx: idx},
            dataType: "text"
          })
      .done (function(response, status){
        alldata = JSON.parse(response);
        $scope.alldata = alldata;
        if (jQuery.isEmptyObject($scope.alldata)) {
          //no items left
          $scope.hideall();
        }
        $scope.updateGraphs();
        $scope.$digest();
        document.getElementById("grocItem").value = '';
        
      })
      .fail (function (response,status){
         bootbox.alert("Server Down!");
      });
      
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

    $scope.clearList = function() {
      $.ajax({
            type: "POST",
            url: "https://grocery-server.herokuapp.com/deleteAll/",
            data: {login: $scope.id},
            dataType: "text"
          })
      .done (function(response, status){
        alldata = JSON.parse(response);
        $scope.alldata = alldata;
        $scope.updateGraphs();
        $scope.hideall();
        $scope.$digest();
        document.getElementById("grocItem").value = '';        
      })
      .fail (function (response,status){
         bootbox.alert("Server Down!");
      });
    };



  }]);
