'use strict';

angular.module('flightsearch')
    .controller('MainCtrl', function($scope, Data, SetData) {
        $scope.flightDetails = "";
        $scope.return_flights = 'false';
        $scope.stations = ["Ahmedabad", "Bangalore", "Chennai", "Chandigarh", "Delhi", "Hyderabad", "Kolkata", "Mumbai", "Pune"];
        $scope.show_origin = "";
        $scope.show_destination = "";
        $scope.number_returning_flights = 'false';
        $scope.after_search = 'false';

        Data.get_data('scripts/flights.json').success(function(api_data) {
            $scope.flightDetails = SetData.set_flight_data(api_data);
        });

        $scope.search = function(flight) {
            $scope.after_search = 'true';
            var counter_onwards = 0;
            var allflights = $scope.flightDetails;
            $scope.number_returning_flights = 0;
            $scope.number_advancing_flights = 0;
            $scope.search_results = {
                "onwards": [],
                "towards": []
            };
            $scope.flight_object = {};
            angular.forEach(allflights, function(value, key) {

                if ((allflights[key].destination == flight.destination) &&
                    (allflights[key].source == flight.origin) &&
                    (parseInt((allflights[key].fare).split(" ")[1]) <= $scope.item.cost)) {
                    $scope.search_results.onwards.push(allflights[key]);
                }

                if ((allflights[key].destination == flight.origin) &&
                    (allflights[key].source == flight.destination) &&
                    (parseInt((allflights[key].fare).split(" ")[1]) <= $scope.item.cost)) {
                    $scope.search_results.towards.push(allflights[key]);
                }

                //$scope.search_results.push($scope.flight_object);
            });
            if ($scope.search_results.towards.length > 0) {
                    $scope.number_returning_flights = $scope.search_results.towards.length;
                }
                if ($scope.search_results.onwards.length > 0) {
                    $scope.number_advancing_flights = $scope.search_results.onwards.length;
                }

            $scope.show_origin = flight.origin;
            $scope.show_destination = flight.destination;
        };

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.set_return = function(returning) {
            if (returning == "oneway") {
                $scope.return_flights = 'false';
            } else {
                $scope.return_flights = 'true';
            }
        }

        $scope.item = {
            name: 'Price',
            cost: 10000,
            minPrice: 0,
            maxPrice: 15000
        };
        $scope.currencyFormatting = function(value) {
            return value.toString() + " $";
        };

    });
