// JavaScript file
//Back end controls

var app = angular.module('nytAPI', ['ui.router']);
var chart = angular.module('simple-chart', []);

// app.config([
// '$stateProvider',
// '$urlRouterProvider',
// function($stateProvider, $urlRouterProvider) {
//   $stateProvider
//     .state('home', {
//         url: '/home',
//         templateUrl: '/home.html',
//         controller: 'MainCtrl',
//         resolve: {
//         postPromise: ['dates', function(dates){
//         return dates.getAll();
//       }]
//     }
//   });

//     $urlRouterProvider.otherwise('home');
// }])
//   .state('dates', {
//     url: '/dates/{id}',
//     templateUrl: '/dates.html',
//     controller: 'PostsCtrl',
//     resolve: {
//       post: ['$stateParams', 'posts', function($stateParams, posts) {
//         return posts.get($stateParams.id);
//       }]
//     }
//   });


app.controller('MainCtrl', [
    '$scope',
    'dates',

    function($scope, dates) {
        $scope.dates = dates.dates;

        $scope.addDate = function()
        {   
            if(!$scope.year || $scope.year === '') {return;}
            dates.create({
                year: $scope.year,
                month: $scope.month,
                day: $scope.day
            });
            $scope.year = '';
            $scope.month = '';
            $scope.day = '';
            //$scope.date = ('year'+'month'+'day');
        };

        
    }]);


//chart testing section

google.load("visualization", "1", {packages:["corechart"]});

// chart.controller('ChartController', ['$scope', '$http', function($scope, $http){
//     $http.get('./nameOfData').success(function(data){
        
//         var API_URL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?%20&fq=pub_date:(2010-10-10)&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6:19:73419027";
//         var makeChart = new google.visualization.Table(container);
        
//         var options = {'title': 'DateOfEntry Articles'}
//         makeChart.draw(chart,options);
//     });  
// }]);

google.setOnLoadCallback(drawChart);
      
    function drawChart() {
      var jsonData = $.ajax({
          url: "API_URL",
          dataType: "json",
          async: false
          }).responseText;
          
        // Create our data table out of JSON data loaded from server.
      var data = new google.visualization.DataTable(jsonData);
      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.Table(document.getElementById('chart_div'));
      chart.draw(data, {width: 400, height: 240});
    }



     
