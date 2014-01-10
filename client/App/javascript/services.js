'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.


angular.module('myApp.services', ['ngRoute'])
.factory('_', function() {
	return window._; // assumes underscore has already been loaded on the page
})

.service('loginStatusService', function($http) {

/* 	var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
	// Initialize a new promise
		var deferred = $q.defer();

		// Make an AJAX call to check if the user is logged in
		$http.get('/loggedin').success(function(user){
			// Authenticated
			if (user !== '0'){
				$timeout(deferred.resolve, 0);
				$rootScope.isLogged=true;
			}else { // Not Authenticated
				$timeout(function(){deferred.reject();}, 0);
				$rootScope.isLogged=false;
			}
		});

		return deferred.promise;
	};
 */
	//var loginState = {isLogged: false, username: 'init'};
	
	/* $http.get('/loggedin')
		.success(function(user){

			// Authenticated
			if (user !== '0'){
				loginState = {isLogged: true, username: 'logged'};
			} else { // Not Authenticated
				loginState = {isLogged: false, username: 'not logged'};
			}
		}); */

	//return loginState;
});
