(function(){  
    'use strict';
    
    angular.module('openWeatherApp.controllers', [])
        .controller('AppCtrl', function($scope , $log , WeatherService, moment, _) {
            // If there is no match and you want to see all the sections, you will need to change the values.
            var convenientTemp = 21;
            var convenientHumidity = 50;
            $scope.loading = true;
            $scope.tempArr = [];
            $scope.winningCities = [];
            $scope.leadingCities = [];
            $scope.optimalPlace = [];
            $scope.showhideOptimalPlace = false;
            $scope.date = moment().format("ddd MMM DD YYYY, h:mm:ss a")
            
            WeatherService.getTemp()
                .then(function(response) {
                    for(var i = 0; i < response.data.list.length; i++) {
                        var temp = response.data.list[i].main.temp;
                        var humidity = response.data.list[i].main.humidity;
                        if(temp == convenientTemp && humidity == convenientHumidity) {
                            $scope.winningCities.push(response.data.list[i]);
                        } else {
                            $scope.winningMessage = 'There is no winning city with convenient weather';
                        }
                        if (((temp == convenientTemp + 1) || (temp == convenientTemp - 1)) && 
                            ((humidity == convenientHumidity + 1) || (humidity == convenientHumidity - 1)) ) {
                            $scope.tempArr.push(response.data.list[i]);
                            $scope.leadingCities = _.filter($scope.tempArr, function(t) {
                                return t.main.temp !== convenientTemp || t.main.humidity !== convenientHumidity; });
                        } else {
                            $scope.leadingMessage = 'There is no leading cities with convenient weather';
                        }
                        if (temp == convenientTemp + 1) {
                            $scope.optimalPlace.push(response.data.list[i]); 
                        } else {
                            $scope.optimalPlaceMessage = 'There is no optimal place for male or female'; 
                        }
                    }
                })
                .catch(function(err) {
                    $scope.loading = false;
                    $log.error('There Was an Error: ', err);
                    throw err;
                })
                .finally(function() {
                    // called no matter success or failure
                    $scope.loading = false;
                });
        });
})(); 