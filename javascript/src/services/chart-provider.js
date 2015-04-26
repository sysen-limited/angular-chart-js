(function () {
    'use strict';

    var ChartProvider = (function () {
        var self;

        function ChartProvider() {
            self = this;
        }

        ChartProvider.prototype.$get = ['$window', function($window) {
            if ($window.Chart) {
                var chart = $window.Chart;

                return chart;
            } else {
                console.log("Unable to load Chart.JS please make sure it is included");
            }
        }];

        ChartProvider.$inject = [
        ];

        return ChartProvider;
    })();

    angular.module('sysChart').provider('chartProvider', ChartProvider);
})();