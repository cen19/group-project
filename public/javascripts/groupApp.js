// JavaScript file
//Back end controls

var app = angular.module('NYT_API', ['ui.router']);
google.load("visualization", "1.1", {packages:["table"]});

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
        $scope.resource = data;
        console.log($scope.resource);
        });
        
        function drawChart() {
        var articleData = $http.get(API_URL).success(function(data){
        articleData = data;
          
        // Create our data table out of JSON data loaded from server.
        var getArticles = new google.visualization.DataTable(articleData);

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.TableChart(document.getElementById('chart_div'));
        chart.draw(getArticles);
            
        });
        }
        
    };
        
    }]);
  
    //     app.factory('Article', function () {
    //     function Article(data) {
    //     for (attr in data) {
    //         if (data.hasOwnProperty(attr))
    //                 this[attr] = data[attr];
    //         }
    //     }
 
    //     Article.prototype.getResult = function() {
    //         if (this.status == 'complete') {
    //             if (this.passed === null) return "Finished";
    //             else if (this.passed === true) return "Pass";
    //             else if (this.passed === false) return "Fail";
    //         }
    //         else return "Running";
    //     };
 
    //     return Article;
    //     });
        
    //     app.controller('articlecController', ['$scope', 'ArticleManager', function ($scope, ArticleManager) {
    //     var limit = 20;
    //     $scope.loadArticles = function() {
                
    //             ArticleManager.getAll(limit).then(function(articles) {
    //             $scope.article = articles;
    //             limit += 10;
    //     });
            
    //     };

    //     $scope.loadArticles();
    //     }]);

    
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


//https://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&begin_date='+'20101010'+'&end_date='+'20101010'+'&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6%3A19%3A73419027
app.factory('dates', ['$http', function($http) {
    var o = {
        dates: [],
        articles:[],
    };
    // var p = {
    //     results:[]
    // };

    o.getAll = function() {
        return $http.get('/dates').success(function(data) {angular.copy(data, o.dates)}),
        $http.get('').success(function(data) {angular.copy(data, o.data)});
        };
    

    o.create = function(date, api) {
        return $http.post('/Dates', date).success(function(data) {o.dates.push(data)}),
        $http.post('/articles', api).success(function(data) {o.articles.push(data)});
    };

    return o;
    


}]);




//API URL to be used
//------------------
//http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&begin_date=20101010&end_date=20101010&api-key=1e2c9c9b5e282dd8b3fb7a2ab7ee15e6%3A19%3A73419027
//==================