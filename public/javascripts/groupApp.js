// JavaScript file
//Back end controls

var app = angular.module('NYT_API', ['ui.router']);

//GET data
// var request = require('request');


// var chart = angular.module('simple-chart', []);
app.config([


    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['dates', function(dates) {
                        return dates.getAll();
                    }]
                }
            })
            .state('dates', {
                url: '/dates/{id}',
                templateUrl: '/dates.html',
                controller: 'DatesCtrl',
                resolve: {
                    post: ['$stateParams', 'dates', function($stateParams, dates) {
                        return dates.get($stateParams.id);
                    }]
                }
            });

        $urlRouterProvider.otherwise('home');
    }
]);



app.controller('MainCtrl', [
    '$scope',
    'dates',

    function($scope, dates) {
        $scope.dates = dates.dates;
        $scope.addDate = function() {
            if (!$scope.year || $scope.year === '') {
                return;
            }
            dates.create({
                year: $scope.year,
                month: $scope.month,
                day: $scope.day,
            });
            $scope.year = '';
            $scope.month = '';
            $scope.day = '';
        };
    }
]);

Results.controller('ResultsController', function($scope, $http) {

    function fetch() {
        $http.get("http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&begin_date=" + $scope.search + "&end_date=" +
                $scope.search + "&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6%3A19%3A73419027")
            .success(function(response) {
                $scope.details = response;
            });

        $http.get("http://www.omdbapi.com/?s=" + $scope.search)
            .success(function(response) {
                $scope.related = response;
            });
    }
    if ($scope.search === undefined) {
        $scope.search = "20101010";
        fetch();

        var pendingTask;

        $scope.change = function() {
            if (pendingTask) {
                clearTimeout(pendingTask);
            }
            pendingTask = setTimeout(fetch, 800);
        };


    };
});
//configures request for GET
// var options = {
//     url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json',
//     method: 'GET',
//     qs: {'callback': 'svc_search_v2_articlesearch', 'begin_date': '20101010', 'end_date': '20101010', 'api-key': '1e2c9c9b5e282dd8b3fb7a2ab7ee15e6:19:73419027' }
// };

// //starts the request
// request(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         //should print out body of json
//         console.log(body);
//     }
// });


app.factory('dates', ['$http', function($http) {
    var o = {
        dates: []
    };

    o.getAll = function() {
        return $http.get('/dates').success(function(data) {
            angular.copy(data, o.dates);
        });
    };

    o.create = function(date) {
        return $http.post('/dates', date).success(function(data) {
            o.dates.push(data);
        });
    };

    o.get = function(id) {
        return $http.get('/dates/' + id).then(function(res) {
            return res.data;
        });
    };


    return o;

}]);



//http://api.nytimes.com/svc/search/v2/articlesearch.json?%20&fq=pub_date:(2010-10-10)&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6:19:73419027
//http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&begin_date=20101010&end_date=20101010&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6%3A19%3A73419027




// POST data html

// configures request for POST
// var options = {
//     url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json',
//     method: 'GET',
//     form: {'callback': 'svc_search_v2_articlesearch', 'begin_date': '20101010', 'end_date': '20101010', 'api-key': '1e2c9c9b5e282dd8b3fb7a2ab7ee15e6:19:73419027' }
// };




//chart testing section

// google.load("visualization", "1.1", {packages:["table"]});
// chart.controller('ChartController', ['$scope', '$http', function($scope, $http){
// $http.get('api.nytimes.com/svc/search/v2/articlesearch.json?%20&fq=pub_date:(2010-10-10)&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6:19:73419027').success(function(data){

// var API_URL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?%20&fq=pub_date:(2010-10-10)&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6:19:73419027";
// var dataArray = formatDataForView(data);

//         var dataTable = new google.visualization.arrayToDataTable(dataArray, false);
//         var displayTable = new googele.visualization.Table(document.getElementById('chart_div'));

//         var options = {'title': 'DateOfEntry Articles'}
//         displayTable.draw(dataTable, options);
//     });  
// }]);

// function formatDataForView(data){
//     var dataArray = [];

//     for (var whatever in data[0]){
//         dataArray.push(whatever);
//     }
//     return dataArray;
// }

// google.setOnLoadCallback(drawChart);

//     function drawChart() {
//       var jsonData = $.ajax({
//           url: "API_URL",
//           dataType: "json",
//           async: false
//           }).responseText;

//         // Create our data table out of JSON data loaded from server.
//       var data = new google.visualization.DataTable(jsonData);
//       // Instantiate and draw our chart, passing in some options.
//       var chart = new google.visualization.Table(document.getElementById('chart_div'));
//       chart.draw(data, {width: 400, height: 240});
//     }
