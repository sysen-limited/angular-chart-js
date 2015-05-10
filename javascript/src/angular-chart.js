(function () {
    'use strict';

    angular.module('sysChart', ['sysChartProvider', 'sysChartFactory'])
        .directive('sysChartLine', ['ChartFactory', function(ChartFactory) {
            return new ChartFactory('Line');
        }])
        .directive('sysChartBar', ['ChartFactory', function(ChartFactory) {
            return new ChartFactory('Bar');
        }]);
})();
