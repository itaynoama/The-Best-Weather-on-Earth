(function(){    
    'use strict';

    angular.module('openWeatherApp.services', [])
        .service('WeatherService', function($http , $q) {
            var URL = 'http://api.openweathermap.org/data/2.5/box/city?bbox=-180,-90,180,90,10';
            var request = {
                method: 'GET',
                url: URL,
                params: {
                  mode: 'json',
                  units: 'metric',
                  async: true,
                  appid: 'd2a76cc05d27839deafc2dccc861baff'
                }
            };
            return {
                getTemp: function() {
                    var deferred = $q.defer();
                    // $http returns a promise, which has a then function, which also returns a promise.
                    return $http(request)
                        .success(function(response) {
                            deferred.resolve(response);
                        })
                        .error(function(reason) {
                            // The promise is rejected if there is an error with the HTTP call.
                            deferred.reject(reason);
                        });
                }
            };
        });
})(); 