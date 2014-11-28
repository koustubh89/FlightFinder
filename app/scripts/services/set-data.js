'use strict';

angular.module('flightsearch')
    .service('SetData', function() {
        this.set_flight_data = function(data) {
            return data;
        };

    });
