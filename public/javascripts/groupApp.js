// JavaScript file
//Back end controls

var app = angular.module('NYT_API', ['ui.router']);

app.config([

    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: ('MainCtrl'),
                resolve: {
                    postPromise: ['dates', function(dates) {
                        return dates.getAll();
                    }]
                }
            });
            // .state('dates', {
            //     url: '/dates/{id}',
            //     templateUrl: '/dates.html',
            //     controller: 'DatesCtrl',
            //     resolve: {
            //         post: ['$stateParams', 'dates', function($stateParams, dates) {
            //             return dates.get($stateParams.id);
            //         }]
            //     }
            // });

        $urlRouterProvider.otherwise('home');
    }
]);

// app.controller('dataController', function($scope, $http){
//     var pendingTask;
     
//      if($scope.search === undefined){
//       $scope.search = "20101010";
//       fetch();
//     }

//     $scope.change = function(){
//       if(pendingTask){
//         clearTimeout(pendingTask);
//       }
//       pendingTask = setTimeout(fetch, 800);
//     };

//     function fetch(){
//             $http.get("http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&begin_date=20101010&end_date=20101010&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6%3A19%3A73419027")
//             .success(function(response) {
//                 $scope.details = response;
//             });
//     }

//     $scope.update = function(movie){
//       $scope.search = movie.Title;
//       $scope.change();
//     };

//     $scope.select = function(){
//       this.setSelectionRange(0, this.value.length);
//     };
//   });

app.controller('MainCtrl', [
    '$scope',
    'dates',
    '$http',
    '$rootScope',
    'articles',

    

    function ($scope, dates, $http, $rootScope, articles) {
        $scope.dates = dates.dates;
        $scope.articles = articles.articles;
        
        $scope.addDate = function() {
            if (!$scope.year || $scope.year === '') {
                return;
            }
            if (!$scope.month || $scope.month === '') {
                return;
            }
            if (!$scope.day || $scope.day === '') {
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
            $scope.maxLimit = -5;


var uYear = '2010';
var uMonth = '10';
var uDay = '10';
var uDate = uYear+uMonth+uDay;


var API_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&begin_date='+uDate+'&end_date='+uDate+'&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6%3A19%3A73419027';
$http.get(API_URL).success(function(data) {
$rootScope.resource = data;
console.log($rootScope.resource); 
    
});
    articles.create({
        snippet: $rootScope.resource,
    });
    $scope.snipper ='';
    

};
        }]);
 

    // articles.create({
    //     snippet: $rootScope.resource
        
        
    


// app.controller('ResponseController', function($scope, $http) {

//     function fetch() {
//         $http.get("http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&begin_date=" + $scope.search + "&end_date=" +
//                 $scope.search + "&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6%3A19%3A73419027")
//             .success(function(response) {
//                 $scope.details = response;
//             });

//     }
//     if ($scope.search === undefined) {
//         $scope.search = "20101010";
//         fetch();
//     };
// });

//Runs this console log when the webpage loads
// app.run(['$http', '$rootScope',
//     function($http, $rootScope) {
//       console.log('Run');
//       $http.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&begin_date=20101010&end_date=20101010&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6%3A19%3A73419027')
//         .success(function(data) {
//           $rootScope.resource = data;
//           console.log($rootScope.resource);
//         });
//     }
//   ]);

// app.controller('getData', [
//     '$http', '$rootScope',
//     function($http, $rootScope) {
//         console.log('Run');
//         $http.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&begin_date=20101010&end_date=20101010&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6%3A19%3A73419027')
//         .success(function(data) {
//           $rootScope.resource = data;
//           console.log($rootScope.resource);
//     })}]);


// app.controller('DataController', ['$scope', 'Resource',
//   function($scope, Resource) {
//       $scope.
//     console.log('controller');
//     console.log(Resource);
//   }
// ]);
// app.controller('DataCtrl', )  
// app.controller('DataCtrl', function($scope,$http) {
    
//     if($scope.dates===undefined){
//         $scope.dates = "20101010";
//         fetch();
//     }
    
    // function fetch(){
    //             $http.get("http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&begin_date=" + 20101010 + "&end_date=" +
    //             20101010 + "&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6%3A19%3A73419027")
    //         .success(function(response) {
    //             $scope.details = response;
    //         });
    // }
    




app.factory('dates', ['$http', function($http) {
    var o = {
        dates: [],
        data:[],
    };
    // var p = {
    //     results:[]
    // };

    o.getAll = function() {
        return $http.get('/dates').success(function(data) {angular.copy(data, o.dates)}),
        $http.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&begin_date=20101010&end_date=20101010&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6%3A19%3A73419027').success(function(data) {angular.copy(data, o.data)});
        };
    

    o.create = function(date, api) {
        return $http.post('/Dates', date).success(function(data) {o.dates.push(data)}),
        $http.post('/articles', api).success(function(data) {o.data.push(data)});
    };

    return o;


}]);

// app.factory('storingAPIdata', ['$http', function($http){
    
//     var data;
//     $http.get(API_URL).success(function(store){
//         data=store;
//     });
//     return{ 
//         getData: function() {
//             return data;
//         }
//     };
// }]);


// app.factory('MasterData', ['$rootScope', '$http', '$q', '$log', 
//     function($rootScope, $http, $q, $log) {

//     var responseData;
//     $http.get('http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&begin_date=20101010&end_date=20101010&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6%3A19%3A73419027').then(function (response) {
//         responseData = response.data;
//         console.log(response.data);
//     });

//     return responseData;

// }]);



//API URL to be used
//------------------
//http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&begin_date=20101010&end_date=20101010&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6%3A19%3A73419027
//==================