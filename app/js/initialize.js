var app = angular.module('tabApp',['ngRoute','ngCookies']);
var token;

	app.config(['$httpProvider', function($httpProvider) {
		$httpProvider.defaults.headers.post['Content-Type'] = ''
            + 'application/json; charset=UTF-8';
		$httpProvider.defaults.headers.put['Content-Type'] = ''
            + 'application/json; charset=UTF-8';
	}]);
	app.run(['$location', '$rootScope', function($location, $rootScope) {
		$rootScope.title = '';
    	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        	$rootScope.title = current.$$route.title;
			$rootScope.isActive = function (path) {
  				return ($location.path().substr(0, path.length) === path) ? true : false;
			}
    	});
}]);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true).hashPrefix('!');
			$routeProvider.
			when('/pages/not_found', {
				title: 'Page Not Found',
				templateUrl: 'app/pages/not_found.html',
				controller: ''
		  	}).
			when('/about', {
				title: 'About',
				templateUrl: 'app/pages/about.html',
				controller: ''
		  	}).
		  	otherwise({
				redirectTo: '/pages/not_found'
		  	});
		}
	]);	
	app.factory('authHttpResponseInterceptor',['$q', '$location', '$rootScope', function($q, $location, $rootScope){
		return {
			response: function(response){
				if (response.status === 401) {
					//console.log("Response 401");
				}
				return response || $q.when(response);
			},
			responseError: function(rejection) {
				if (rejection.status === 401) {
					$rootScope.isLoggedIn = false;
					emptyLocalStorage();
					//console.log("Response Error 401",rejection);
					$location.path('/login');
				}else if (rejection.status >= 500) {
					$rootScope.isServerError = true;
				}
				return $q.reject(rejection);
			}
		}
	}]);