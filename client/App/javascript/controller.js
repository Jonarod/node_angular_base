'use strict';

angular.module('myApp.controllers', ['ngRoute', 'myApp.services'])

.controller('homeController', function ($scope, $http) {
	$scope.message = 'This page is available to everybody !!!';
})
.controller('mainTodoController', function ($rootScope, $scope, $http, _) {
	$scope.formData = {};
	$scope.todos = [];

	
	// when landing on the page, get all todos and show them
	if($rootScope.isLogged){
		$http.get('/api/todos')
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
				if(data == 'Unauthorized')
					$scope.todos = [{"text":"You are not authorized to see this!"}];
			});
	}
	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData.text = '';
				$scope.todos=_.union($scope.todos, data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {			
				$scope.todos = _.reject($scope.todos, function(value){
					return value._id == id
				});
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

});


