angular.module('weatherApp', ['ngRoute'])
//.provider is an api method that takes both a name of the service as well as a funciton that defines the actual provider
.provider('Weather', function(){
	var apiKey ="";


//creating a function that will generate the url because the API requires to pass the key with every request
	this.getUrl = function(type, ext) {
		return "http://api.wunderground.com/api/" + 
		this.apiKey + "/" + type + "/q/" +
		ext + '.json';
	};
		
	this.setApiKey = function(key) {
		if (key) this.apiKey = key;

	};
//defining a $get() function that returns methods availble to the service
//setting up the $q service that provides deffered and promise implementations

	this.$get = function($q, $http) {
		var self = this;
		return {
			getWeatherForecast: function(city) {
				var d = $q.defer();
				$http({
					method: 'GET',
					url: self.getUrl("forecast", city),
					cache: true
				}).success(function(data){
					d.resolve(data.forecast.simpleforecast);
				}).error(function(err) {
					d.reject(err);
				});
				return d.promise;
			}
		}
	}
})


//injecting the Weather service into the .config function and configuring the service with the api key
.config(function(WeatherProvider) {
	WeatherProvider.setApiKey('fc524d75ad3af57e');
})
.controller('mainCtrl', 
	function($scope, $timeout, Weather) {
	//Building a date object
	$scope.date = {};

	//Update function
	var updateTime = function() {
		$scope.date.raw = new Date();
		$timeout(updateTime, 1000);

	}
	//Every second mainCtrl is on the view, updateTime() will be ran to update $scope.date.raw
	updateTime();


	$scope.weather = {} //injecting Weather service into the scope
	Weather.getWeatherForecast("CA/Los_Angeles") //Hardcoding Los_Angeles to cehck if it works
	.then(function(data) {
		$scope.weather.forecast = data;

	})


});