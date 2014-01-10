'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute', 'myApp.controllers', 'myApp.services'])
.config( function($routeProvider, $locationProvider, $httpProvider) {
		
/* 	$httpProvider.responseInterceptors.push(function($q, $location) {
	  return function(promise) {
		return promise.then(
		  // Success: just return the response
		  function(response){
			return response;
		  }, 
		  // Error: check the error status to get only the 401
		  function(response) {
			if (response.status === 401)
			  $location.url('/');
			return $q.reject(response);
		  }
		);
	  }
	});
 */
	
	$routeProvider
		// route for the home page
		.when('/', {
			templateUrl : 'partials/home',
			controller  : 'homeController'
		})
		// route for the about page
		.when('/todo', {
			templateUrl : 'partials/todo',
			controller  : 'mainTodoController'
		})
		.otherwise({
			redirectTo: '/'
		});
	$locationProvider.html5Mode(true);

})
.run(function($rootScope, $http, $route, $location, $window){
	$rootScope.loginMessage = '';
	$rootScope.username = '';
	$rootScope.password = '';

	var socket = io.connect('http://192.168.1.27:3000');

	socket.on('connect', function (){
		
	});
	
	$http.get('/loginstatus')
		.success(function(loggedUser){
			$rootScope.isLogged = loggedUser.isLogged;
			$rootScope.username = loggedUser.username;
		});


	// Login function is available in any pages
	$rootScope.login = function(){
		$http.post('/login', {
			username: $rootScope.username,
			password: $rootScope.password,
		})
			.success(function(user){
				$rootScope.password = '';
				$rootScope.username = user.username;
				$rootScope.isLogged=true;
				$('#logMessage').addClass("hide");
				$route.reload();
			})
			.error(function(){
				$rootScope.isLogged=false;
				$rootScope.loginMessage= 'Wrong login or password.';
				$('#logMessage').removeClass("hide");
				console.log('Wrong login or password.');
				$rootScope.username = '';
				$rootScope.password = '';
			});
	};		

	// Logout function is available in any pages
	$rootScope.logout = function(){
		$http.get('/logout')
			.success(function(data) {
				$rootScope.isLogged = false;
				$rootScope.username = '';
				$rootScope.password = '';
				$window.location.href='/';
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
		
});

