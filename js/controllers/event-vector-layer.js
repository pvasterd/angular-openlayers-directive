(function() {

    var app = angular.module('webapp');

    app.controller('EventVectorLayerController', function($scope, $location, $http) {
        angular.extend($scope, {
            center: {
                lat: 30,
                lon: 0,
                zoom: 2
            },
            defaults: {
                interactions: {
                    mouseWheelZoom: false
                }
            },
            layers: {
                main: {
                    source: {
                        type: 'TileJSON',
                        url: 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp'
                    }
                },
                geojson: {
                    source: {
                        type: 'GeoJSON',
                        url: 'examples/json/countries.geo.json'
                    }
                }
            },
            events: {
                layers: {
                    vector: ['mousemove', 'click']
                }
            }
        });

        $scope.$on('openlayers.geojson.mousemove', function(event, feature) {
            $scope.$apply(function(scope) {
                if (feature && $scope.countries[feature.getId()]) {
                    scope.mouseMoveCountry = feature ? scope.countries[feature.getId()].name : '';
                }
            });
        });

        $scope.$on('openlayers.geojson.click', function(event, feature) {
            $scope.$apply(function(scope) {
                if (feature) {
                    scope.mouseClickCountry = feature ? scope.countries[feature.getId()].name : '';
                }
            });
        });

        // Get the countries data from a JSON
        $http.get('examples/json/all.json').success(function(data) {
            // Put the countries on an associative array
            $scope.countries = {};
            for (var i = 0; i < data.length; i++) {
                var country = data[i];
                $scope.countries[country['alpha-3']] = country;
            }
        });
    });

})();