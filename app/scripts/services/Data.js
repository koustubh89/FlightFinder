angular.module('flightsearch')
    .service('Data', function Data($http) {
        var Data = {
            get_data: function(url) {
                window.api_response = url;
                var promise = $http.get(url).success(function(api_response) {
                    window.api_response = api_response
                })
                return promise;
            }
        }
        return Data;
    });
