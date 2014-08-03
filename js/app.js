angular.module('weatherApp', ['ngRoute'])
.controller('mainCtrl', function($scope, $timeout) {
	//Building a date object
	$scope.date = {};

	//Update function
	var updateTime = function() {
		$scope.date.raw = new Date();
		$timeout(updateTime, 1000);

	}
	//Every second mainCtrl is on the view, updateTime() will be ran to update $scope.date.raw
	updateTime();
});