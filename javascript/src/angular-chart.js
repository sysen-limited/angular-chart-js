(function () {
    'use strict';

    angular.module('sysChart', ['sysChartProvider', 'sysChartFactory'])
        .config(['chartProvider', function(chart) {
            chart.setOptions({
                // Add global config here...
            });
        }])

        .directive('sysChartLine', ['ChartFactory', function(ChartFactory) {
            return new ChartFactory('Line');
        }])

        .directive('sysChartBar', ['ChartFactory', function(ChartFactory) {
            return new ChartFactory('Bar');
        }])

        .directive('sysChartRadar', ['ChartFactory', function(ChartFactory) {
            return new ChartFactory('Radar');
        }])

        .directive('sysChartPolar', ['ChartFactory', function(ChartFactory) {
            return new ChartFactory('PolarArea');
        }]);
})();
