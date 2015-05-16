(function () {
    'use strict';

    var ChartProvider = (function () {
        var self, options = {};

        function getOptions(chartType) {
            var customOptions = chartType && options[chartType] || {};
            return angular.extend({}, options, customOptions);
        }

        function ChartProvider() {
            self = this;
        }

        ChartProvider.prototype.setOptions = function(customise, chartType) {
            if(chartType) {
                options[chartType] = angular.extend(options[chartType] || {}, customise);
            } else {
                options = angular.extend(options, customise);
            }
        };

        ChartProvider.prototype.$get = ['$window', function($window) {
            if ($window.Chart) {
                var chart = $window.Chart;
                chart.defaults.global.responsive = true;

                chart.defaults.global = angular.extend({}, chart.defaults.global, options);

                return { lib: chart, opts: getOptions };
            } else {
                console.log("Unable to load Chart.JS please make sure it is included");
            }
        }];

        ChartProvider.$inject = [
            // nothing to inject
        ];

        return ChartProvider;
    })();

    angular.module('sysChartProvider', []).provider('chart', ChartProvider);
})();
