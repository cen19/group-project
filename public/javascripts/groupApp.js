// JavaScript file
//Back end controls

var app = angular.module('NYT_API', ['ui.router']);
google.load("visualization", "1.1", {packages:['table']});


app.config([

    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: ('MainCtrl'),
                service: ('ArticleManager'),
                resolve: {
                    postPromise: ['dates', function(dates) {
                        return dates.getAll();
                    }]
                }
            });

        $urlRouterProvider.otherwise('home');
    }
]);

app.controller('MainCtrl', [
    '$scope',
    'dates',
    '$http',
    '$rootScope',

    function ($scope, dates, $http, articles, ArticleManager) {
        $scope.dates = dates.dates;
        
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
        var uYear = ($scope.year).toString('');
        var uMonth = ($scope.month).toString('');
        var uDay = ($scope.day).toString('');
        var uDate = uYear+uMonth+uDay;
            $scope.year = '';
            $scope.month = '';
            $scope.day = '';
            $scope.maxLimit = -1;


        var API_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&begin_date='+uDate+'&end_date='+uDate+'&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6%3A19%3A73419027';
        
        $http.get(API_URL).success(function(data) {
         $scope.resources = data.response.docs;
          console.log($scope.resources);
        
        $scope.articles = $scope.resources;
        $scope.headers = ['Title', 'Snippet', 'URL'];
       angular.forEach($scope.articles, function (article) {
         $scope.results.push({
           headline: article.headline.main,
           url: article.web_url,
           snippet: article.snippet
         });
       }
       );
            });
        


        };  

    }]);

app.factory('dates', ['$http', function($http) {
    var o = {
        dates: [],
        articles:[],
    };


    o.getAll = function() {
        return $http.get('/dates').success(function(data) {angular.copy(data, o.dates)});
        };
    

    o.create = function(date, api) {
        return $http.post('/Dates', date).success(function(data) {o.dates.push(data)});
    };

    return o;
    


}]);


//API URL to be used
//------------------
//http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&begin_date=20101010&end_date=20101010&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6%3A19%3A73419027
//==================