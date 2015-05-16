(function () {
    'use strict';

    function ChartFactory(ChartJS) {
        return function chart(type) {
            return {
                restrict: 'CA',
                scope: {
                    dataset: '=',
                    options: '='
                },
                link: function (scope, elem) {
                    var ctx;

                    elem = angular.element(elem);
                    ctx = elem[0].getContext("2d");

                    var chartOptions = angular.extend({}, ChartJS.opts[type], scope.options);
                    new ChartJS.lib(ctx)[type](scope.dataset, chartOptions);
                }
            };
        }
    }

    ChartFactory.$inject = [
        'chart'
    ];

    angular.module('sysChartFactory', []).factory('ChartFactory', ChartFactory);

})();
