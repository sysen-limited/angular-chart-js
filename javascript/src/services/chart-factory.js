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

                    new ChartJS(ctx)[type](scope.dataset, scope.options);
                }
            };
        }
    }

    ChartFactory.$inject = [
        'chartProvider'
    ];

    angular.module('sysChartFactory', []).factory('ChartFactory', ChartFactory);

})();
