'use strict';

var app = angular.module('tabApp', ['ngRoute', 'ngCookies']);
var token;

app.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = '' + 'application/json; charset=UTF-8';
	$httpProvider.defaults.headers.put['Content-Type'] = '' + 'application/json; charset=UTF-8';
}]);
app.run(['$location', '$rootScope', function ($location, $rootScope) {
	$rootScope.title = '';
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
		$rootScope.title = current.$$route.title;
		$rootScope.isActive = function (path) {
			return $location.path().substr(0, path.length) === path ? true : false;
		};
	});
}]);
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!');
	$routeProvider.when('/pages/not_found', {
		title: 'Page Not Found',
		templateUrl: 'app/pages/not_found.html',
		controller: ''
	}).when('/about', {
		title: 'About',
		templateUrl: 'app/pages/about.html',
		controller: ''
	}).otherwise({
		redirectTo: '/pages/not_found'
	});
}]);
app.factory('authHttpResponseInterceptor', ['$q', '$location', '$rootScope', function ($q, $location, $rootScope) {
	return {
		response: function response(_response) {
			if (_response.status === 401) {
				//console.log("Response 401");
			}
			return _response || $q.when(_response);
		},
		responseError: function responseError(rejection) {
			if (rejection.status === 401) {
				$rootScope.isLoggedIn = false;
				emptyLocalStorage();
				//console.log("Response Error 401",rejection);
				$location.path('/login');
			} else if (rejection.status >= 500) {
				$rootScope.isServerError = true;
			}
			return $q.reject(rejection);
		}
	};
}]);

"use strict";

(function ($) {
  "use strict";
  /*$(document).ready(function(){
  $(".loginLink a").click(function(e){
  $(".mobileContent").addClass("toggleContent");
  e.preventDefault();
  	});
  });*/
})(jQuery);

'use strict';

var userModule = angular.module('userModule', ['ngRoute', 'ngCookies', 'ngResource']);
userModule.filter('unsafe', function ($sce) {
	return $sce.trustAsHtml;
});
userModule.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!');
	$routeProvider.when('/login', {
		title: 'Login',
		templateUrl: 'app/users/login.html',
		controller: 'LoginController'
	}).when('/', {
		title: 'Login',
		templateUrl: 'app/users/login.html',
		controller: 'LoginController'
	}).when('/create', {
		title: 'Create',
		templateUrl: 'app/users/create.html',
		controller: 'LoginController'
	}).when('/my_account', {
		title: 'My Account',
		templateUrl: 'app/users/my_account.html',
		controller: 'LoginController'
	}).when('/change_password', {
		title: 'Change Password',
		templateUrl: 'app/users/change_password.html',
		controller: 'LoginController'
	}).when('/forgotpass', {
		title: 'Forgot Password',
		templateUrl: 'app/users/forgotpass.html',
		controller: 'LoginController'
	}).when('/reset_password', {
		title: 'Reset Password',
		templateUrl: 'app/users/reset_password.html',
		controller: 'LoginController'
	}).when('/user_activation', {
		title: 'User Activation',
		templateUrl: 'app/users/user_activation.html',
		controller: 'LoginController'
	});
}]);
userModule.controller('loginController', ['$rootScope', '$routeParams', '$scope', '$http', '$location', '$timeout', '$window', function ($rootScope, $routeParams, $scope, $http, $location, $timeout, $window) {
	$scope.activation = {};
	$rootScope.isLoggedIn = false;
	$scope.loginSubmit = 'Login';
	$scope.login = function (custId, password) {
		if (!$scope.isSending) {
			$scope.isSending = true;
			$scope.loginSubmit = 'Authentication Processing...';
			$http.post(baseUrl + '/user/login', { userId: custId, pwd: password }).success(function (response) {
				$scope.isSending = false;
				$rootScope.isLoggedIn = true;
				$rootScope.userRole = response.data.role;
				$rootScope.consId = response.data.consId;
				$rootScope.username = response.data.username;
				setLocalStorage(response.data.token, response.data.consId, response.data.username, response.data.role);
				api.init(response.data.token);
				$location.path('/dashboard');
			}).error(function (data, status) {
				$scope.isSending = false;
				$scope.loginErr = true;
				$scope.loginSubmit = 'Login';
				$scope.loginErrText = data.msg;
			});
		}
	};
}]);


//# sourceMappingURL=app.js.map